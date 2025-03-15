
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center w-full md:w-1/3 relative">
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Rechercher un membre du personnel..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
