
import React from "react";
import { StudentPerformance } from "@/types/student";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface PerformanceListTabProps {
  performances: StudentPerformance[];
  isLoadingPerformances: boolean;
  isPerformancesError: boolean;
  handleEditPerformance: (performance: StudentPerformance) => void;
  handleAddNewPerformance: () => void;
  deletePerformanceMutation: {
    mutate: (id: string) => void;
  };
}

const PerformanceListTab: React.FC<PerformanceListTabProps> = ({ 
  performances, 
  isLoadingPerformances, 
  isPerformancesError,
  handleEditPerformance,
  handleAddNewPerformance,
  deletePerformanceMutation
}) => {
  
  const getPerformanceColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performances scolaires</CardTitle>
        <CardDescription>
          Historique des évaluations et notes de l'élève
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingPerformances ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : isPerformancesError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Une erreur s'est produite lors du chargement des données</p>
          </div>
        ) : performances.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune évaluation enregistrée pour cet élève</p>
            <Button 
              onClick={handleAddNewPerformance}
              variant="outline" 
              size="sm" 
              className="mt-4"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une évaluation
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Matière</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Note</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {performances.map((performance) => (
                  <tr key={performance.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{performance.exam_date ? new Date(performance.exam_date).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3">{performance.subject}</td>
                    <td className="px-4 py-3">
                      <span className={getPerformanceColor(performance.grade || 0, performance.max_grade || 20)}>
                        {performance.grade || 0} / {performance.max_grade || 20}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPerformance(performance)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deletePerformanceMutation.mutate(performance.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </td>
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

export default PerformanceListTab;
