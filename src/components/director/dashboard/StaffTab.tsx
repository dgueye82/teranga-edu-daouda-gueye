
import React from "react";
import {
  BookOpen,
  UserCheck,
  Book
} from "lucide-react";
import DashboardCard from "../DashboardCard";

const StaffTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Enseignants" 
        description="Profils, présences et formations" 
        icon={<BookOpen className="h-6 w-6 text-blue-600" />}
        link="/director/teachers"
      />
      <DashboardCard 
        title="Personnel Administratif" 
        description="Surveillants, secrétaires, comptables" 
        icon={<UserCheck className="h-6 w-6 text-indigo-600" />}
        link="/director/admin-staff"
      />
      <DashboardCard 
        title="Planification Cours" 
        description="Relation professeur-cours-classes" 
        icon={<Book className="h-6 w-6 text-teal-600" />}
        link="/director/course-planning"
      />
    </div>
  );
};

export default StaffTab;
