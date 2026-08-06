import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, UserCheck, CalendarClock, Building2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStaffMembers } from "@/services/staff";
import { useSchoolScope } from "@/contexts/SchoolContext";

const StaffDashboardTab = () => {
  const { activeSchoolId, activeSchool } = useSchoolScope();

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ["staff", activeSchoolId],
    queryFn: () => getStaffMembers(activeSchoolId),
  });

  const stats = useMemo(() => {
    const total = staff.length;
    const active = staff.filter((s) => (s.status ?? "").toLowerCase() === "actif").length;
    const teaching = staff.filter((s) =>
      (s.role ?? "").toLowerCase().includes("enseignant")
    ).length;
    const byDepartment = staff.reduce<Record<string, number>>((acc, s) => {
      const key = s.department?.trim() || "Non renseigné";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    const recent = [...staff]
      .filter((s) => s.joinDate)
      .sort((a, b) => (a.joinDate < b.joinDate ? 1 : -1))
      .slice(0, 5);
    return { total, active, teaching, byDepartment, recent };
  }, [staff]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const kpis = [
    { label: "Effectif total", value: stats.total, icon: Users },
    { label: "En activité", value: stats.active, icon: UserCheck },
    { label: "Personnel enseignant", value: stats.teaching, icon: CalendarClock },
    {
      label: "Départements",
      value: Object.keys(stats.byDepartment).length,
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-8">
      {activeSchool && (
        <p className="text-sm text-muted-foreground">
          Établissement : <span className="font-medium">{activeSchool.name}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Répartition par département</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(stats.byDepartment).length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune donnée disponible.</p>
            )}
            {Object.entries(stats.byDepartment)
              .sort((a, b) => b[1] - a[1])
              .map(([dept, count]) => (
                <div key={dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{dept}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${stats.total ? (count / stats.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Arrivées récentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recent.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune donnée disponible.</p>
            )}
            {stats.recent.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.role || "—"} · {member.department || "—"}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{member.joinDate}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboardTab;
