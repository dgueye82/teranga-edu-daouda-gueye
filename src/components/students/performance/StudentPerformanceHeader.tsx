
import React from "react";
import { Student } from "@/types/student";
import StudentHeader from "@/components/students/StudentHeader";

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
  // Create the average info component if data exists
  const averageInfoDisplay = averageInfo && averageInfo.overallAverage > 0 ? (
    <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
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
  ) : undefined;

  return (
    <StudentHeader
      student={student}
      title="Performance de l'élève"
      backUrl={`/student/${id}`}
      additionalInfo={averageInfoDisplay}
    />
  );
};

export default StudentPerformanceHeader;
