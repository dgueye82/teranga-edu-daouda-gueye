import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { School } from "@/types/school";

interface ProfileRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  school_id: string | null;
}

const NONE = "__none__";

const UserSchoolAssignment = ({ schools }: { schools: School[] }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profiles = [], isLoading } = useQuery<ProfileRow[]>({
    queryKey: ["user-profiles-schools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("id,email,first_name,last_name,school_id")
        .order("email");
      if (error) throw new Error(error.message);
      return (data || []) as ProfileRow[];
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ id, schoolId }: { id: string; schoolId: string | null }) => {
      const { error } = await supabase
        .from("user_profiles")
        .update({ school_id: schoolId } as any)
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profiles-schools"] });
      toast({ title: "Rattachement mis à jour" });
    },
    onError: (e: Error) =>
      toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rattachement des utilisateurs</CardTitle>
        <CardDescription>
          Chaque utilisateur ne voit que les données de l'école à laquelle il est rattaché.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : profiles.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun utilisateur trouvé.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[260px]">École</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {[p.first_name, p.last_name].filter(Boolean).join(" ") || "—"}
                  </TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>
                    <Select
                      value={p.school_id ?? NONE}
                      onValueChange={(v) =>
                        assignMutation.mutate({ id: p.id, schoolId: v === NONE ? null : v })
                      }
                    >
                      <SelectTrigger aria-label={`École de ${p.email}`}>
                        <SelectValue placeholder="Non rattaché" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE}>Non rattaché</SelectItem>
                        {schools.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UserSchoolAssignment;
