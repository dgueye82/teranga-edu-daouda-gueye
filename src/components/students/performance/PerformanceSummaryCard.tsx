
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceSummaryCardProps {
  overallAverage: {
    grade: string;
    maxGrade: string;
    percentage: string;
  };
}

const PerformanceSummaryCard: React.FC<PerformanceSummaryCardProps> = ({ overallAverage }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Moyenne générale</CardTitle>
        <CardDescription>Récapitulatif des performances scolaires</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-gray-500">Moyenne générale</h3>
            <p className={`text-4xl font-bold ${
              parseFloat(overallAverage.percentage) >= 70 ? "text-green-600" :
              parseFloat(overallAverage.percentage) >= 50 ? "text-amber-600" :
              "text-red-600"
            }`}>
              {overallAverage.grade} / {overallAverage.maxGrade}
            </p>
            <p className="text-gray-500 mt-1">{overallAverage.percentage}%</p>
          </div>
          
          <div className="flex-1 max-w-xl">
            <div className="bg-gray-100 h-4 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  parseFloat(overallAverage.percentage) >= 70 ? "bg-green-500" :
                  parseFloat(overallAverage.percentage) >= 50 ? "bg-amber-500" :
                  "bg-red-500"
                }`}
                style={{ width: `${Math.min(100, parseFloat(overallAverage.percentage))}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 text-center text-sm mt-2">
              <span className="text-red-500">Insuffisant (&lt;50%)</span>
              <span className="text-amber-500">Moyen (50-70%)</span>
              <span className="text-green-500">Bien (&gt;70%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummaryCard;
