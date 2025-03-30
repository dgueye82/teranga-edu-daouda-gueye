
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolInfoCardProps {
  schoolName: string;
  studentClass: string;
}

const SchoolInfoCard: React.FC<SchoolInfoCardProps> = ({ schoolName, studentClass }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">École</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Nom:</span> {schoolName}</p>
          <p><span className="font-medium">Classe:</span> {studentClass}</p>
          <p><span className="font-medium">Année scolaire:</span> {new Date().getFullYear() - 1}-{new Date().getFullYear()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolInfoCard;
