
import React, { ReactNode } from "react";
import { Student } from "@/types/student";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface StudentHeaderProps {
  student: Student;
  title: string;
  backUrl?: string;
  showBackButton?: boolean;
  additionalInfo?: ReactNode;
  actionButton?: ReactNode;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ 
  student, 
  title,
  backUrl,
  showBackButton = true,
  additionalInfo,
  actionButton
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="outline" onClick={() => navigate(backUrl || `/student/${student.id}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {actionButton}
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {student.first_name} {student.last_name}
          </h2>
          {student.school_name && (
            <p className="text-gray-500">{student.school_name}</p>
          )}
        </div>
        
        {additionalInfo && (
          <div className="ml-auto">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHeader;
