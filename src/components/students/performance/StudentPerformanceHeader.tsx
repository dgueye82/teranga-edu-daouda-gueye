
import React from "react";
import { Student } from "@/types/student";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface StudentPerformanceHeaderProps {
  student: Student;
  id: string;
  averageInfo?: {
    overallAverage: number;
    percentage: number;
  };
}

const StudentPerformanceHeader: React.FC<StudentPerformanceHeaderProps> = ({ 
  student, 
  id,
  averageInfo
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(`/student/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">Performance de l'élève</h1>
        </div>
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
        
        {averageInfo && averageInfo.overallAverage > 0 && (
          <div className="ml-auto bg-gray-100 rounded-lg p-3 flex items-center gap-3">
            <div>
              <p className="text-sm text-gray-500">Moyenne générale</p>
              <p className={`text-lg font-bold ${
                averageInfo.percentage >= 70 ? "text-green-600" :
                averageInfo.percentage >= 50 ? "text-amber-600" :
                "text-red-600"
              }`}>
                {averageInfo.overallAverage.toFixed(2)} / 20
                <span className="text-sm font-normal ml-2">({averageInfo.percentage.toFixed(1)}%)</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPerformanceHeader;
