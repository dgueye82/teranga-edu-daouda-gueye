
import React, { useEffect, useState } from "react";
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
import { calculateStudentAverage } from "@/services/student";

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
  // State to store student averages
  const [studentAverages, setStudentAverages] = useState<{
    [key: string]: { overallAverage: number; percentage: number } | null
  }>({});

  // Fetch average for each student
  useEffect(() => {
    const fetchAverages = async () => {
      const averages: { [key: string]: { overallAverage: number; percentage: number } | null } = {};
      
      for (const student of students) {
        try {
          const averageData = await calculateStudentAverage(student.id);
          if (averageData.overallAverage > 0) {
            averages[student.id] = {
              overallAverage: averageData.overallAverage,
              percentage: averageData.percentage
            };
          } else {
            averages[student.id] = null;
          }
        } catch (error) {
          console.error(`Error fetching average for student ${student.id}:`, error);
          averages[student.id] = null;
        }
      }
      
      setStudentAverages(averages);
    };
    
    if (students.length > 0) {
      fetchAverages();
    }
  }, [students]);

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

  function getAverageColor(percentage: number | undefined) {
    if (!percentage) return "text-gray-500";
    return percentage >= 70 ? "text-green-600" :
           percentage >= 50 ? "text-amber-600" :
           "text-red-600";
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
          <TableHead>Moyenne</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border border-gray-100">
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
            <TableCell>
              {studentAverages[student.id] ? (
                <div className={getAverageColor(studentAverages[student.id]?.percentage)}>
                  <span className="font-semibold">{studentAverages[student.id]?.overallAverage.toFixed(2)}</span>
                  <span className="text-xs ml-1">/ 20</span>
                  <span className="text-xs ml-1">
                    ({studentAverages[student.id]?.percentage.toFixed(1)}%)
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Non évalué</span>
              )}
            </TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
