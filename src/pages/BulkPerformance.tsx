
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "@/services/student";
import { createBulkPerformances } from "@/services/student/performanceService";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Users } from "lucide-react";
import BulkPerformanceForm, { BulkPerformanceFormData } from "@/components/students/performance/BulkPerformanceForm";
import { useNavigate } from "react-router-dom";

const BulkPerformance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [performanceFormOpen, setPerformanceFormOpen] = useState(false);

  // Récupérer la liste des élèves
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  // Mutation pour ajouter des performances à tous les élèves
  const bulkCreateMutation = useMutation({
    mutationFn: ({ studentIds, template }: { studentIds: string[], template: Omit<BulkPerformanceFormData, 'student_id'> }) => 
      createBulkPerformances(studentIds, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances"] });
      toast({
        title: "Évaluations ajoutées",
        description: `Les évaluations ont été ajoutées avec succès à ${students.length} élèves`,
      });
      setPerformanceFormOpen(false);
    },
  });

  const handleAddBulkPerformance = (data: BulkPerformanceFormData) => {
    const studentIds = students.map(student => student.id);
    bulkCreateMutation.mutate({ 
      studentIds, 
      template: data 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Évaluations en Masse</h1>
          <Button 
            onClick={() => setPerformanceFormOpen(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Créer une évaluation pour tous
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ajouter des évaluations pour tous les élèves</CardTitle>
            <CardDescription>
              Créez une évaluation identique qui sera appliquée à tous les élèves en une seule opération
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Users className="h-10 w-10 text-blue-500" />
              <div>
                <div className="font-medium">Total des élèves concernés</div>
                <div className="text-2xl font-bold">{students.length}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p>
                Cette fonctionnalité vous permet d'ajouter simultanément la même évaluation pour tous les élèves.
                Idéal pour des contrôles communs, des examens standardisés, ou des évaluations de niveau.
              </p>
              
              <div className="flex space-x-2">
                <Button onClick={() => setPerformanceFormOpen(true)}>
                  Créer une évaluation pour tous
                </Button>
                <Button variant="outline" onClick={() => navigate("/student-management")}>
                  Retour à la liste des élèves
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <BulkPerformanceForm
          open={performanceFormOpen}
          onOpenChange={setPerformanceFormOpen}
          onSubmit={handleAddBulkPerformance}
          isSubmitting={bulkCreateMutation.isPending}
        />
      </div>
    </div>
  );
};

export default BulkPerformance;
