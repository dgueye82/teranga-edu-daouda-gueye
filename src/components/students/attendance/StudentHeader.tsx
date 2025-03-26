
import React from "react";
import { Student } from "@/types/student";
import GenericStudentHeader from "@/components/students/StudentHeader";

interface StudentHeaderProps {
  student: Student;
}

const StudentHeader = ({ student }: StudentHeaderProps) => {
  return (
    <GenericStudentHeader
      student={student}
      title="Présence de l'élève"
      showBackButton={false}
    />
  );
};

export default StudentHeader;
