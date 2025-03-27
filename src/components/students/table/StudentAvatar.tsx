
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentAvatarProps {
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

const StudentAvatar: React.FC<StudentAvatarProps> = ({ firstName, lastName, photoUrl }) => {
  function getAvatarFallback(firstName: string, lastName: string) {
    return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() : "?";
  }

  return (
    <Avatar className="h-10 w-10 border border-gray-100">
      <AvatarImage src={photoUrl} alt={`${firstName} ${lastName}`} />
      <AvatarFallback className="bg-teranga-blue text-white">
        {getAvatarFallback(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default StudentAvatar;
