
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/types/student";

interface StudentsListProps {
  students: Student[];
  isLoading: boolean;
  selectedSchool: string;
}

const StudentsList = ({ students, isLoading, selectedSchool }: StudentsListProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (selectedSchool === "") {
    return (
      <Card className="py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une école</h3>
          <p className="text-gray-600">Veuillez sélectionner une école pour voir la liste des élèves</p>
        </div>
      </Card>
    );
  }

  if (students.length === 0) {
    return (
      <Card className="py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élève trouvé</h3>
          <p className="text-gray-600">Aucun élève ne correspond aux critères de recherche</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead className="hidden md:table-cell">Classe</TableHead>
            <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
            <TableHead className="hidden md:table-cell">Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const studentClass = student.notes || "Non spécifiée";
            
            return (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.last_name}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell className="hidden md:table-cell">{studentClass}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {student.status === "active" ? "Actif" : student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/student/${student.id}`)}
                  >
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default StudentsList;
