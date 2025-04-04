
import React, { useEffect, useState } from "react";
import { Student } from "@/types/student";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { calculateStudentAverage } from "@/services/student";
import StudentAvatar from "./table/StudentAvatar";
import StudentStatusBadge from "./table/StudentStatusBadge";
import StudentAverageDisplay from "./table/StudentAverageDisplay";
import StudentActions from "./table/StudentActions";

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
                <StudentAvatar 
                  firstName={student.first_name} 
                  lastName={student.last_name}
                  photoUrl={student.photo_url}
                />
                <span>{student.first_name} {student.last_name}</span>
              </div>
            </TableCell>
            <TableCell>{student.school_name || "-"}</TableCell>
            <TableCell>{student.parent_name || "-"}</TableCell>
            <TableCell>
              <StudentStatusBadge status={student.status} />
            </TableCell>
            <TableCell>
              <StudentAverageDisplay averageData={studentAverages[student.id]} />
            </TableCell>
            <TableCell className="text-right">
              <StudentActions 
                student={student} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
