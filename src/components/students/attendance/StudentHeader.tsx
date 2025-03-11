
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/student";

interface StudentHeaderProps {
  student: Student;
}

const StudentHeader = ({ student }: StudentHeaderProps) => {
  function getAvatarFallback(firstName: string, lastName: string) {
    return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() : "?";
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border border-gray-200">
              <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
              <AvatarFallback className="bg-teranga-blue text-white">
                {getAvatarFallback(student.first_name, student.last_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base md:text-lg">
                {student.first_name} {student.last_name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {student.school_name || "Aucune école assignée"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StudentHeader;
