
import React from "react";

interface StudentAverageProps {
  averageData: { overallAverage: number; percentage: number } | null;
}

const StudentAverageDisplay: React.FC<StudentAverageProps> = ({ averageData }) => {
  const getAverageColor = (percentage: number | undefined) => {
    if (!percentage) return "text-gray-500";
    return percentage >= 70 ? "text-green-600" :
           percentage >= 50 ? "text-amber-600" :
           "text-red-600";
  };

  if (!averageData) {
    return <span className="text-gray-400 text-sm">Non évalué</span>;
  }

  return (
    <div className={getAverageColor(averageData.percentage)}>
      <span className="font-semibold">{averageData.overallAverage.toFixed(2)}</span>
      <span className="text-xs ml-1">/ 20</span>
      <span className="text-xs ml-1">
        ({averageData.percentage.toFixed(1)}%)
      </span>
    </div>
  );
};

export default StudentAverageDisplay;
