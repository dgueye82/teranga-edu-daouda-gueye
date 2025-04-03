
import React from "react";
import {
  Calendar,
  BarChart,
  BoxesIcon
} from "lucide-react";
import DashboardCard from "../DashboardCard";

const AdministrativeTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Calendrier Annuel" 
        description="Planification des événements et réunions" 
        icon={<Calendar className="h-6 w-6 text-cyan-600" />}
        link="/director/annual-calendar"
      />
      <DashboardCard 
        title="Finances" 
        description="Contributions et budget" 
        icon={<BarChart className="h-6 w-6 text-yellow-600" />}
        link="/director/finances"
      />
      <DashboardCard 
        title="Inventaire" 
        description="Matériel informatique et mobilier" 
        icon={<BoxesIcon className="h-6 w-6 text-slate-600" />}
        link="/director/inventory-management"
      />
    </div>
  );
};

export default AdministrativeTab;
