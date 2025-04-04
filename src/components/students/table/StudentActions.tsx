
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Student } from "@/types/student";

interface StudentActionsProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentActions: React.FC<StudentActionsProps> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => window.location.href = `/student/${student.id}`}
        title="Voir l'élève"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onEdit(student)}
        title="Modifier l'élève"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 text-red-500 hover:text-red-600"
        onClick={() => onDelete(student.id)}
        title="Supprimer l'élève"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default StudentActions;
