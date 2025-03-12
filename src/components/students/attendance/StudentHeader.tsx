
import React from "react";
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

  // Generate generic photo URL if none exists
  React.useEffect(() => {
    if (!student.photo_url) {
      // Array of generic student photos
      const genericPhotos = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=300"
      ];
      
      // Select a random photo
      student.photo_url = genericPhotos[Math.floor(Math.random() * genericPhotos.length)];
    }
  }, [student]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-16 w-16 border-2 border-gray-200">
              <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
              <AvatarFallback className="bg-teranga-blue text-white text-lg">
                {getAvatarFallback(student.first_name, student.last_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">
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
