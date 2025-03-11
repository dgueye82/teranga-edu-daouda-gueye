
import React from "react";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  isLoading,
  isError,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-10 flex items-center justify-center text-red-500">
        Une erreur est survenue lors du chargement des élèves.
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="w-full py-10 flex items-center justify-center text-gray-500">
        Aucun élève n'a été trouvé.
      </div>
    );
  }

  function getAvatarFallback(firstName: string, lastName: string) {
    return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() : "?";
  }

  return (
    <Table>
      <TableCaption>Liste des élèves</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>École</TableHead>
          <TableHead>Parent</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                  <AvatarFallback className="bg-teranga-blue text-white">
                    {getAvatarFallback(student.first_name, student.last_name)}
                  </AvatarFallback>
                </Avatar>
                <span>{student.first_name} {student.last_name}</span>
              </div>
            </TableCell>
            <TableCell>{student.school_name || "-"}</TableCell>
            <TableCell>{student.parent_name || "-"}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  student.status === "active"
                    ? "bg-green-100 text-green-800"
                    : student.status === "inactive"
                    ? "bg-gray-100 text-gray-800"
                    : student.status === "graduated"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {student.status === "active"
                  ? "Actif"
                  : student.status === "inactive"
                  ? "Inactif"
                  : student.status === "graduated"
                  ? "Diplômé"
                  : "Suspendu"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Link to={`/student/${student.id}`}>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(student)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => onDelete(student.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
