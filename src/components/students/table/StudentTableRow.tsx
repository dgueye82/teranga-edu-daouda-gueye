
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/types/student";
import StudentAvatar from "./StudentAvatar";
import StudentStatusBadge from "./StudentStatusBadge";
import StudentAverage from "./StudentAverage";
import StudentActions from "./StudentActions";

interface StudentTableRowProps {
  student: Student;
  studentAverage: { overallAverage: number; percentage: number } | null;
  onView: (studentId: string) => void;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  studentAverage,
  onView,
  onEdit,
  onDelete
}) => {
  return (
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
        <StudentAverage average={studentAverage} />
      </TableCell>
      <TableCell className="text-right">
        <StudentActions 
          student={student}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
