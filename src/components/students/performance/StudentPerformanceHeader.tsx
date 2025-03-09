
import React from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LineChart } from "lucide-react";

interface StudentPerformanceHeaderProps {
  student: Student;
  id: string;
}

const StudentPerformanceHeader: React.FC<StudentPerformanceHeaderProps> = ({ student, id }) => {
  const navigate = useNavigate();

  const getAvatarFallback = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/student-management")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
            <AvatarFallback className="bg-teranga-blue text-white">
              {getAvatarFallback(student.first_name, student.last_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.first_name} {student.last_name}</h1>
            <div className="flex items-center">
              <p className="text-gray-600 mr-2">
                {student.school_name || "Aucune école assignée"}
              </p>
              <Badge className={`ml-2 ${
                student.status === "active" ? "bg-green-100 text-green-800" :
                student.status === "inactive" ? "bg-gray-100 text-gray-800" :
                student.status === "graduated" ? "bg-blue-100 text-blue-800" :
                student.status === "suspended" ? "bg-red-100 text-red-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {student.status === "active" && "Actif"}
                {student.status === "inactive" && "Inactif"}
                {student.status === "graduated" && "Diplômé"}
                {student.status === "suspended" && "Suspendu"}
                {!student.status && "Non défini"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={() => navigate(`/student-management/details/${id}`)}
          variant="outline"
          size="sm"
          className="text-gray-600"
        >
          Détails
        </Button>
        <Button
          onClick={() => navigate(`/student-management/attendance/${id}`)}
          variant="outline"
          size="sm"
          className="text-green-600"
        >
          Présence
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-orange-500 hover:bg-orange-600"
        >
          <LineChart className="h-4 w-4 mr-2" />
          Notes
        </Button>
      </div>
    </div>
  );
};

export default StudentPerformanceHeader;
