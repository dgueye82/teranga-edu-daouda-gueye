
import React from "react";

interface StudentStatusBadgeProps {
  status?: string;
}

const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      case "graduated":
        return "Diplômé";
      default:
        return "Suspendu";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass()}`}
    >
      {getStatusLabel()}
    </span>
  );
};

export default StudentStatusBadge;
