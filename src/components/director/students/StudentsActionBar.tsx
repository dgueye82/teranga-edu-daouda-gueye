
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

interface StudentsActionBarProps {
  selectedGrade: string;
  studentsCount: number;
}

const StudentsActionBar = ({ selectedGrade, studentsCount }: StudentsActionBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium">
        {selectedGrade === "all" 
          ? "Tous les élèves" 
          : `Classe de ${selectedGrade}`}
        {studentsCount > 0 && ` (${studentsCount} élèves)`}
      </h2>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un élève
        </Button>
      </div>
    </div>
  );
};

export default StudentsActionBar;
