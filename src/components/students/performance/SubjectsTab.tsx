
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectAverage {
  subject: string;
  averageGrade: string;
  averageMaxGrade: string;
  percentage: string;
  count: number;
}

interface SubjectsTabProps {
  subjectAverages: SubjectAverage[];
  isLoadingPerformances: boolean;
}

const SubjectsTab: React.FC<SubjectsTabProps> = ({ subjectAverages, isLoadingPerformances }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moyennes par matière</CardTitle>
        <CardDescription>
          Performance de l'élève par matière
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingPerformances ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : subjectAverages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune donnée disponible pour calculer les moyennes</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Matière</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Moyenne</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Pourcentage</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Évaluations</th>
                </tr>
              </thead>
              <tbody>
                {subjectAverages.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{subject.subject}</td>
                    <td className="px-4 py-3">
                      <span className={
                        parseFloat(subject.percentage) >= 80 ? "text-green-600" :
                        parseFloat(subject.percentage) >= 60 ? "text-blue-600" :
                        parseFloat(subject.percentage) >= 40 ? "text-amber-600" :
                        "text-red-600"
                      }>
                        {subject.averageGrade} / {subject.averageMaxGrade}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              parseFloat(subject.percentage) >= 80 ? "bg-green-600" :
                              parseFloat(subject.percentage) >= 60 ? "bg-blue-600" :
                              parseFloat(subject.percentage) >= 40 ? "bg-amber-600" :
                              "bg-red-600"
                            }`}
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                        <span>{subject.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{subject.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectsTab;
