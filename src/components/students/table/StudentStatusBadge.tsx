
import React from "react";
import { getStatusClass, getStatusLabel } from "@/utils/studentFilters";

interface StudentStatusBadgeProps {
  status?: string;
}

const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};

export default StudentStatusBadge;
