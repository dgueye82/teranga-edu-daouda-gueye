import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StaffFilters: React.FC = () => {
  const { pathname, search } = useLocation();
  const base = pathname;

  const isActive = (value?: string) =>
    value ? search === `?department=${value}` : !search;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Link to={base}>
          <Button variant={isActive() ? "default" : "outline"}>Tout le personnel</Button>
        </Link>
        <Link to={`${base}?department=teaching`}>
          <Button variant={isActive("teaching") ? "default" : "outline"}>
            Personnel enseignant
          </Button>
        </Link>
        <Link to={`${base}?department=administrative`}>
          <Button variant={isActive("administrative") ? "default" : "outline"}>
            Personnel administratif
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StaffFilters;
