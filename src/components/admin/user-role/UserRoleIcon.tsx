
import React from "react";
import { Shield, UserCheck, User, AlertCircle, Building, BookOpen, Users, FileText, School } from "lucide-react";
import { UserRole } from "@/types/auth";

interface UserRoleIconProps {
  role?: UserRole;
  className?: string;
}

const UserRoleIcon: React.FC<UserRoleIconProps> = ({ role, className = "h-4 w-4" }) => {
  switch (role) {
    case "admin":
      return <Shield className={`${className} text-red-500`} />;
    case "director":
      return <Building className={`${className} text-purple-500`} />;
    case "secretary":
      return <FileText className={`${className} text-blue-500`} />;
    case "teacher":
      return <BookOpen className={`${className} text-green-500`} />;
    case "parent":
      return <Users className={`${className} text-orange-500`} />;
    case "student":
      return <User className={`${className} text-blue-500`} />;
    case "inspector":
      return <School className={`${className} text-yellow-500`} />;
    case "school_life":
      return <UserCheck className={`${className} text-teal-500`} />;
    default:
      return <AlertCircle className={`${className} text-gray-500`} />;
  }
};

export default UserRoleIcon;
