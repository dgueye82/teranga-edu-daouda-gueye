
import React from "react";
import {
  Users,
  ClipboardList,
  MessageSquare
} from "lucide-react";
import DashboardCard from "../DashboardCard";

const StudentsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Classes" 
        description="Liste des élèves par classe" 
        icon={<Users className="h-6 w-6 text-emerald-600" />}
        link="/director/classes"
      />
      <DashboardCard 
        title="Dossiers Scolaires" 
        description="Bulletins, présences et historique" 
        icon={<ClipboardList className="h-6 w-6 text-amber-600" />}
        link="/director/student-records"
      />
      <DashboardCard 
        title="Discipline" 
        description="Suivi des punitions et correspondance" 
        icon={<MessageSquare className="h-6 w-6 text-rose-600" />}
        link="/director/discipline"
      />
    </div>
  );
};

export default StudentsTab;
