
import React from "react";
import { Input } from "@/components/ui/input";

interface UserRoleSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const UserRoleSearchBar: React.FC<UserRoleSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <Input
        placeholder="Rechercher par email ou nom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default UserRoleSearchBar;
