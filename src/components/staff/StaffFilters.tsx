
import React from "react";
import NavLink from "@/components/layout/navigation/NavLink";

const StaffFilters: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 mb-4">
        <NavLink to="/staff-management" variant="button">
          Tout le personnel
        </NavLink>
        <NavLink to="/staff-management?department=teaching" variant="button">
          Personnel enseignant
        </NavLink>
        <NavLink to="/staff-management?department=administrative" variant="button">
          Personnel administratif
        </NavLink>
      </div>
    </div>
  );
};

export default StaffFilters;
