
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/student";
import { 
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { calculateStudentAverage } from "@/services/student";
import TableLoadingState from "./table/TableLoadingState";
import TableErrorState from "./table/TableErrorState";
import TableEmptyState from "./table/TableEmptyState";
import StudentTableRow from "./table/StudentTableRow";

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
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
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
    return <TableLoadingState />;
  }

  if (isError) {
    return <TableErrorState />;
  }

  if (students.length === 0) {
    return <TableEmptyState />;
  }

  const viewStudentDetails = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  const tableCaption = isAdmin ? "Liste des élèves" : "Liste de mes élèves";

  return (
    <Table>
      <TableCaption>{tableCaption}</TableCaption>
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
          <StudentTableRow
            key={student.id}
            student={student}
            studentAverage={studentAverages[student.id]}
            onView={viewStudentDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
