
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentsBySchool } from "@/services/student";
import { School } from "@/types/school";
import { Student } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface SchoolStudentsListProps {
  school: School;
}

const SchoolStudentsList: React.FC<SchoolStudentsListProps> = ({ school }) => {
  const navigate = useNavigate();
  
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students", "school", school.id],
    queryFn: () => getStudentsBySchool(school.id),
  });

  function getStatusColor(status: string | undefined) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getAvatarFallback(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  function navigateToStudentDetails(id: string) {
    navigate(`/student-management/details/${id}`);
  }

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Skeleton className="h-6 w-36" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (students.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span>{school.name}</span>
            <Badge className="ml-2 bg-gray-200 text-gray-700">{students.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-4">
            Aucun élève inscrit dans cette école
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>{school.name}</span>
          <Badge className="ml-2 bg-blue-100 text-blue-800">{students.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigateToStudentDetails(student.id)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                <AvatarFallback className="bg-teranga-blue text-white">
                  {getAvatarFallback(student.first_name, student.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {student.first_name} {student.last_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {student.email || "Pas d'email"}
                </p>
              </div>
              <Badge className={`ml-2 ${getStatusColor(student.status)}`}>
                {student.status === "active" && "Actif"}
                {student.status === "inactive" && "Inactif"}
                {student.status === "graduated" && "Diplômé"}
                {student.status === "suspended" && "Suspendu"}
                {!student.status && "Non défini"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolStudentsList;
