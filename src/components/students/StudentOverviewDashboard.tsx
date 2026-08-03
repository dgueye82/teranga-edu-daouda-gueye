import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getStudents } from "@/services/student/studentService";
import { getPaymentsForYear, createPayment } from "@/services/student/paymentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Wallet, AlertTriangle, Clock, UserX, Search, Plus, TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AttRow = {
  student_id: string;
  status: string;
  reason: string | null;
  date: string;
};

const currency = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " FCFA";

const reasonLabels: Record<string, string> = {
  maladie: "Maladie",
  familial: "Familial",
  transport: "Transport",
  non_justifie: "Non justifié",
  autre: "Autre",
};

const StudentOverviewDashboard: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "partial" | "unpaid">("all");
  const [paymentDialog, setPaymentDialog] = useState<{ open: boolean; studentId?: string; studentName?: string }>({
    open: false,
  });
  const [form, setForm] = useState({
    month: currentMonth,
    year: currentYear,
    amount: 0,
    method: "espèces",
  });

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", currentYear],
    queryFn: () => getPaymentsForYear(currentYear),
  });

  const { data: attendance = [] } = useQuery<AttRow[]>({
    queryKey: ["attendance-all-year", currentYear],
    queryFn: async () => {
      const start = `${currentYear}-01-01`;
      const end = `${currentYear}-12-31`;
      const { data, error } = await (supabase as any)
        .from("student_attendance")
        .select("student_id,status,reason,date")
        .gte("date", start)
        .lte("date", end);
      if (error) throw new Error(error.message);
      return (data || []) as AttRow[];
    },
  });

  const createPaymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", currentYear] });
      toast({ title: "Paiement enregistré" });
      setPaymentDialog({ open: false });
      setForm({ month: currentMonth, year: currentYear, amount: 0, method: "espèces" });
    },
    onError: (e: any) =>
      toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const rows = useMemo(() => {
    return students.map((s) => {
      const monthlyFee = Number(s.monthly_fee ?? 0);
      const expected = monthlyFee * currentMonth;
      const paidRows = payments.filter((p) => p.student_id === s.id);
      const totalPaid = paidRows.reduce((sum, p) => sum + Number(p.amount || 0), 0);
      const remaining = Math.max(expected - totalPaid, 0);

      const att = attendance.filter((a) => a.student_id === s.id);
      const absents = att.filter((a) => a.status === "absent");
      const lates = att.filter((a) => a.status === "late");
      const lastAbsent = absents
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

      let payStatus: "paid" | "partial" | "unpaid" = "unpaid";
      if (monthlyFee === 0) payStatus = "paid";
      else if (totalPaid >= expected && expected > 0) payStatus = "paid";
      else if (totalPaid > 0) payStatus = "partial";

      return {
        student: s,
        monthlyFee,
        expected,
        totalPaid,
        remaining,
        absencesCount: absents.length,
        latesCount: lates.length,
        lastReason: lastAbsent?.reason ?? null,
        payStatus,
      };
    });
  }, [students, payments, attendance, currentMonth]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.payStatus !== statusFilter) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      const full = `${r.student.first_name} ${r.student.last_name} ${r.student.class_name ?? ""} ${r.student.school_name ?? ""}`.toLowerCase();
      return full.includes(q);
    });
  }, [rows, search, statusFilter]);

  const kpis = useMemo(() => {
    const totalExpected = rows.reduce((s, r) => s + r.expected, 0);
    const totalPaid = rows.reduce((s, r) => s + r.totalPaid, 0);
    const totalRemaining = rows.reduce((s, r) => s + r.remaining, 0);
    const unpaidCount = rows.filter((r) => r.payStatus !== "paid").length;
    const totalAbsences = rows.reduce((s, r) => s + r.absencesCount, 0);
    const totalLates = rows.reduce((s, r) => s + r.latesCount, 0);
    return { totalExpected, totalPaid, totalRemaining, unpaidCount, totalAbsences, totalLates };
  }, [rows]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("students").update({ status } as any).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({ title: "Statut mis à jour", description: "Le statut de l'élève a été modifié." });
    },
    onError: (e: Error) =>
      toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const openPayment = (id: string, name: string) => {

    const target = rows.find((r) => r.student.id === id);
    setForm({
      month: currentMonth,
      year: currentYear,
      amount: target?.monthlyFee || 0,
      method: "espèces",
    });
    setPaymentDialog({ open: true, studentId: id, studentName: name });
  };

  const submitPayment = () => {
    if (!paymentDialog.studentId) return;
    createPaymentMutation.mutate({
      student_id: paymentDialog.studentId,
      month: form.month,
      year: form.year,
      amount: Number(form.amount),
      method: form.method,
    });
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total encaissé ({currentYear})
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currency(kpis.totalPaid)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Attendu à ce jour : {currency(kpis.totalExpected)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Montant restant dû
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{currency(kpis.totalRemaining)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpis.unpaidCount} élève(s) avec solde
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Retards cumulés
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalLates}</div>
            <p className="text-xs text-muted-foreground mt-1">Depuis le 1er janvier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absences cumulées
            </CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalAbsences}</div>
            <p className="text-xs text-muted-foreground mt-1">Sur l'année en cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Detail table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Suivi détaillé des élèves
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Paiements, retards et absences — année {currentYear}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un élève…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="partial">Partiel</SelectItem>
                  <SelectItem value="unpaid">Impayé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élève</TableHead>
                <TableHead>Classe / École</TableHead>
                <TableHead>Statut élève</TableHead>
                <TableHead>Statut paiement</TableHead>

                <TableHead className="text-right">Payé</TableHead>
                <TableHead className="text-right">Restant</TableHead>
                <TableHead className="text-center">Retards</TableHead>
                <TableHead className="text-center">Absences</TableHead>
                <TableHead>Dernier motif</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                    Aucun élève correspondant.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.student.id}>
                  <TableCell className="font-medium">
                    {r.student.first_name} {r.student.last_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.student.class_name || "—"}
                    {r.student.school_name ? ` · ${r.student.school_name}` : ""}
                  </TableCell>
                  <TableCell>
                    {r.payStatus === "paid" && (
                      <Badge className="bg-success text-success-foreground hover:bg-success">À jour</Badge>
                    )}
                    {r.payStatus === "partial" && (
                      <Badge className="bg-warning text-warning-foreground hover:bg-warning">Partiel</Badge>
                    )}
                    {r.payStatus === "unpaid" && (
                      <Badge variant="destructive">Impayé</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{currency(r.totalPaid)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.remaining > 0 ? (
                      <span className="text-destructive font-semibold">{currency(r.remaining)}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.latesCount > 0 ? (
                      <Badge variant="outline" className="border-warning text-warning">
                        {r.latesCount}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.absencesCount > 0 ? (
                      <Badge variant="outline" className="border-destructive text-destructive">
                        {r.absencesCount}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.lastReason ? reasonLabels[r.lastReason] ?? r.lastReason : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        openPayment(r.student.id, `${r.student.first_name} ${r.student.last_name}`)
                      }
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Paiement
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment dialog */}
      <Dialog open={paymentDialog.open} onOpenChange={(o) => setPaymentDialog({ open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enregistrer un paiement — {paymentDialog.studentName}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <Label>Mois</Label>
              <Select
                value={String(form.month)}
                onValueChange={(v) => setForm((f) => ({ ...f, month: Number(v) }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {new Date(2000, m - 1, 1).toLocaleDateString("fr-FR", { month: "long" })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Année</Label>
              <Input
                type="number"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
              />
            </div>
            <div className="col-span-2">
              <Label>Montant (FCFA)</Label>
              <Input
                type="number"
                min={0}
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
              />
            </div>
            <div className="col-span-2">
              <Label>Méthode</Label>
              <Select value={form.method} onValueChange={(v) => setForm((f) => ({ ...f, method: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="espèces">Espèces</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="virement">Virement</SelectItem>
                  <SelectItem value="chèque">Chèque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialog({ open: false })}>
              Annuler
            </Button>
            <Button onClick={submitPayment} disabled={createPaymentMutation.isPending}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentOverviewDashboard;
