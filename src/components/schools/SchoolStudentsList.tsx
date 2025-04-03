import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentsBySchool } from "@/services/student";
import { School } from "@/types/school";
import { Student } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search, UserCheck, LineChart, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface SchoolStudentsListProps {
  school: School;
}

const SchoolStudentsList: React.FC<SchoolStudentsListProps> = ({ school }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  
  const { data: students = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["students", "school", school.id],
    queryFn: () => getStudentsBySchool(school.id),
  });

  useEffect(() => {
    console.log(`Auth state changed in SchoolStudentsList for school: ${school.id}, refetching...`);
    refetch();
  }, [user, refetch, school.id]);

  useEffect(() => {
    console.log(`SchoolStudentsList for school ${school.id} rendered with ${students.length} students`);
  }, [school.id, students]);

  const filteredStudents = students.filter(student => 
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  function navigateToAttendance(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    navigate(`/student-management/attendance/${id}`);
  }

  function navigateToPerformance(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    navigate(`/student-management/performance/${id}`);
  }

  function translateStatus(status: string | undefined) {
    switch (status) {
      case "active": return "Actif";
      case "inactive": return "Inactif";
      case "graduated": return "Diplômé";
      case "suspended": return "Suspendu";
      default: return "Non défini";
    }
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

  if (isError) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span>{school.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-red-500 py-4">
            Erreur lors du chargement des élèves. Veuillez réessayer.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center" onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
            <span>{school.name}</span>
            <Badge className={`ml-2 ${students.length > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}>
              {students.length}
            </Badge>
            {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </CardTitle>
          <div className="flex-1 max-w-xs ml-4">
            {isExpanded && students.length > 0 && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un élève..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {students.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Aucun élève inscrit dans cette école
            </p>
          ) : filteredStudents.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Aucun élève ne correspond à votre recherche
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div 
                    className="flex items-center mb-2"
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
                      {translateStatus(student.status)}
                    </Badge>
                  </div>
                  <div className="flex mt-2 space-x-2 justify-center border-t pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
                      onClick={() => navigateToStudentDetails(student.id)}
                    >
                      <ClipboardList className="h-3 w-3 mr-1" />
                      Détails
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50 text-xs" 
                      onClick={(e) => navigateToAttendance(student.id, e)}
                    >
                      <UserCheck className="h-3 w-3 mr-1" />
                      Présence
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50 text-xs" 
                      onClick={(e) => navigateToPerformance(student.id, e)}
                    >
                      <LineChart className="h-3 w-3 mr-1" />
                      Notes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {students.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/student-management")}
                className="text-sm"
              >
                Voir tous les élèves
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SchoolStudentsList;
