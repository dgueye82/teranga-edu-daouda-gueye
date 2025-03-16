
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StaffFilters: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 mb-4">
        <Link to="/staff-management">
          <Button variant={window.location.pathname === "/staff-management" && !window.location.search ? "default" : "outline"}>
            Tout le personnel
          </Button>
        </Link>
        <Link to="/staff-management?department=teaching">
          <Button variant={window.location.search === "?department=teaching" ? "default" : "outline"}>
            Personnel enseignant
          </Button>
        </Link>
        <Link to="/staff-management?department=administrative">
          <Button variant={window.location.search === "?department=administrative" ? "default" : "outline"}>
            Personnel administratif
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StaffFilters;
