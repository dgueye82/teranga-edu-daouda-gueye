
import React from "react";
import {
  Users,
  School,
  FileText,
  Calendar,
  DollarSign,
  BoxesIcon
} from "lucide-react";
import DashboardCard from "../DashboardCard";

const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Personnel" 
        description="Gestion des enseignants et du personnel administratif" 
        icon={<Users className="h-6 w-6 text-blue-600" />}
        link="/director/staff"
      />
      <DashboardCard 
        title="Élèves" 
        description="Vue par classe et historique des élèves" 
        icon={<School className="h-6 w-6 text-green-600" />}
        link="/director/students"
      />
      <DashboardCard 
        title="Calendrier" 
        description="Événements, examens et réunions" 
        icon={<Calendar className="h-6 w-6 text-purple-600" />}
        link="/director/calendar"
      />
      <DashboardCard 
        title="Bulletins & Évaluations" 
        description="Relevés scolaires et suivi des performances" 
        icon={<FileText className="h-6 w-6 text-orange-600" />}
        link="/director/reports"
      />
      <DashboardCard 
        title="Budget & Finances" 
        description="Suivi des contributions et budget annuel" 
        icon={<DollarSign className="h-6 w-6 text-red-600" />}
        link="/director/finance"
      />
      <DashboardCard 
        title="Matériel & Inventaire" 
        description="Gestion des équipements et mobiliers" 
        icon={<BoxesIcon className="h-6 w-6 text-gray-600" />}
        link="/director/inventory"
      />
    </div>
  );
};

export default OverviewTab;
