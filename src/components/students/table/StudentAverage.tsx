
import React from "react";

interface StudentAverageProps {
  average: {
    overallAverage: number;
    percentage: number;
  } | null;
}

const StudentAverage: React.FC<StudentAverageProps> = ({ average }) => {
  function getAverageColor(percentage: number | undefined) {
    if (!percentage) return "text-gray-500";
    return percentage >= 70 ? "text-green-600" :
           percentage >= 50 ? "text-amber-600" :
           "text-red-600";
  }

  if (!average) {
    return <span className="text-gray-400 text-sm">Non évalué</span>;
  }

  return (
    <div className={getAverageColor(average.percentage)}>
      <span className="font-semibold">{average.overallAverage.toFixed(2)}</span>
      <span className="text-xs ml-1">/ 20</span>
      <span className="text-xs ml-1">
        ({average.percentage.toFixed(1)}%)
      </span>
    </div>
  );
};

export default StudentAverage;
