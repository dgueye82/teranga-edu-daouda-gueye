
import React from "react";
import { Student } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentInfoCardProps {
  student: Student;
  studentClass: string;
}

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student, studentClass }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Informations de l'élève</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Nom:</span> {student.last_name}</p>
          <p><span className="font-medium">Prénom:</span> {student.first_name}</p>
          {student.birth_date && (
            <p><span className="font-medium">Date de naissance:</span> {new Date(student.birth_date).toLocaleDateString()}</p>
          )}
          {student.status && (
            <p><span className="font-medium">Statut:</span> {student.status}</p>
          )}
          <p><span className="font-medium">Classe:</span> {studentClass}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
