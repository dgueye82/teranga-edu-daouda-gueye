
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School } from "@/types/school";

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  schoolFilter: string;
  setSchoolFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  schools: School[];
}

const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  schoolFilter,
  setSchoolFilter,
  statusFilter,
  setStatusFilter,
  schools
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
      <div className="w-full md:w-1/2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Rechercher un étudiant..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2 w-full md:w-1/2">
        <Select value={schoolFilter} onValueChange={setSchoolFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par école" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les écoles</SelectItem>
            {schools.map(school => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
            <SelectItem value="graduated">Diplômé</SelectItem>
            <SelectItem value="suspended">Suspendu</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StudentFilters;
