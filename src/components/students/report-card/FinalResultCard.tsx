
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinalResultCardProps {
  overallAverage: number;
  percentage: number;
  getGradeColor: (percentage: number) => string;
  getGlobalAppreciation: (percentage: number) => string;
  studentFirstName: string;
}

const FinalResultCard: React.FC<FinalResultCardProps> = ({
  overallAverage,
  percentage,
  getGradeColor,
  getGlobalAppreciation,
  studentFirstName,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Résultat final</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm">Moyenne générale</p>
              <p className={`text-xl font-bold ${getGradeColor(percentage)}`}>
                {overallAverage.toFixed(2)}/20
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm">Pourcentage</p>
              <p className={`text-xl font-bold ${getGradeColor(percentage)}`}>
                {percentage.toFixed(2)}%
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm">Appréciation</p>
              <p className="text-lg font-semibold">
                {getGlobalAppreciation(percentage)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Commentaires</h3>
            <p className="text-gray-700">
              {percentage >= 70 
                ? `${studentFirstName} a obtenu d'excellents résultats ce trimestre. Félicitations !` 
                : percentage >= 50
                ? `${studentFirstName} a obtenu des résultats satisfaisants. Continuez à travailler régulièrement.`
                : `${studentFirstName} doit fournir plus d'efforts et travailler plus régulièrement.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalResultCard;
