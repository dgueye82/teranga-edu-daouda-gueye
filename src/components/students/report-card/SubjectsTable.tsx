
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectAverage {
  subject: string;
  average: number;
  maxGrade: number;
  percentage: number;
  count: number;
}

interface SubjectsTableProps {
  subjectAverages: SubjectAverage[];
  getGradeColor: (percentage: number) => string;
  getAppreciation: (percentage: number) => string;
}

const SubjectsTable: React.FC<SubjectsTableProps> = ({
  subjectAverages,
  getGradeColor,
  getAppreciation,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Résultats par matière</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matière</TableHead>
              <TableHead className="text-right">Moyenne</TableHead>
              <TableHead className="text-right">Sur</TableHead>
              <TableHead className="text-right">Pourcentage</TableHead>
              <TableHead>Appréciation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjectAverages.map((subject, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{subject.subject}</TableCell>
                <TableCell className={`text-right ${getGradeColor(subject.percentage)}`}>
                  {subject.average.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{subject.maxGrade.toFixed(2)}</TableCell>
                <TableCell className={`text-right ${getGradeColor(subject.percentage)}`}>
                  {subject.percentage.toFixed(2)}%
                </TableCell>
                <TableCell>{getAppreciation(subject.percentage)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubjectsTable;
