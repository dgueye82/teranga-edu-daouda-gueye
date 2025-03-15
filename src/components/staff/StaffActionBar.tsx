
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";

interface StaffActionBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddStaff: () => void;
}

const StaffActionBar: React.FC<StaffActionBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onAddStaff 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <Button onClick={onAddStaff}>
        <Plus className="h-4 w-4 mr-2" />
        Ajouter un membre
      </Button>
    </div>
  );
};

export default StaffActionBar;
