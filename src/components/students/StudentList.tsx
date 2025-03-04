
import React from "react";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, UserCheck, LineChart, ClipboardList } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

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

  function navigateToAttendance(id: string) {
    navigate(`/student-management/attendance/${id}`);
  }

  function navigateToPerformance(id: string) {
    navigate(`/student-management/performance/${id}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-lg text-gray-500">Aucun étudiant trouvé</p>
        </div>
      ) : (
        students.map((student) => (
          <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                    <AvatarFallback className="bg-teranga-blue text-white">
                      {getAvatarFallback(student.first_name, student.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base md:text-lg">
                      {student.first_name} {student.last_name}
                    </CardTitle>
                    <CardDescription>
                      {student.school_name || "Aucune école assignée"}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status === "active" && "Actif"}
                  {student.status === "inactive" && "Inactif"}
                  {student.status === "graduated" && "Diplômé"}
                  {student.status === "suspended" && "Suspendu"}
                  {!student.status && "Non défini"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2 pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {student.email && (
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="truncate">{student.email}</p>
                  </div>
                )}
                {student.phone && (
                  <div>
                    <p className="text-gray-500">Téléphone:</p>
                    <p>{student.phone}</p>
                  </div>
                )}
                {student.birth_date && (
                  <div>
                    <p className="text-gray-500">Date de naissance:</p>
                    <p>{new Date(student.birth_date).toLocaleDateString()}</p>
                  </div>
                )}
                {student.enrollment_date && (
                  <div>
                    <p className="text-gray-500">Inscription:</p>
                    <p>{new Date(student.enrollment_date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => navigateToStudentDetails(student.id)}
                >
                  <ClipboardList className="h-4 w-4 mr-1" />
                  Détails
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50" 
                  onClick={() => navigateToAttendance(student.id)}
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Présence
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50" 
                  onClick={() => navigateToPerformance(student.id)}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  Notes
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onEdit(student)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action ne peut pas être annulée. Cela supprimera définitivement l'étudiant {student.first_name} {student.last_name} et toutes les données associées.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onDelete(student.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentList;
