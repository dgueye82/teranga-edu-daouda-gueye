
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentById } from "@/services/student";
import { getStudentPerformances, createStudentPerformance, updateStudentPerformance, deleteStudentPerformance } from "@/services/student/performanceService";
import { StudentPerformance as StudentPerformanceType, StudentPerformanceFormData } from "@/types/student";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentPerformanceForm from "@/components/students/StudentPerformanceForm";

// Import refactored components
import StudentPerformanceHeader from "@/components/students/performance/StudentPerformanceHeader";
import PerformanceSummaryCard from "@/components/students/performance/PerformanceSummaryCard";
import PerformanceListTab from "@/components/students/performance/PerformanceListTab";
import SubjectsTab from "@/components/students/performance/SubjectsTab";
import PerformanceChartTab from "@/components/students/performance/PerformanceChartTab";

const StudentPerformance = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [performanceFormOpen, setPerformanceFormOpen] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState<StudentPerformanceType | null>(null);

  const { data: student, isLoading: isLoadingStudent } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id!),
    enabled: !!id,
  });

  const { 
    data: performances = [], 
    isLoading: isLoadingPerformances,
    isError: isPerformancesError
  } = useQuery({
    queryKey: ["studentPerformances", id],
    queryFn: () => getStudentPerformances(id!),
    enabled: !!id,
  });

  const createPerformanceMutation = useMutation({
    mutationFn: createStudentPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", id] });
      toast({
        title: "Performance ajoutée",
        description: "La performance a été ajoutée avec succès",
      });
      setPerformanceFormOpen(false);
      setEditingPerformance(null);
    },
  });

  const updatePerformanceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudentPerformanceFormData> }) => 
      updateStudentPerformance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", id] });
      toast({
        title: "Performance mise à jour",
        description: "La performance a été mise à jour avec succès",
      });
      setPerformanceFormOpen(false);
      setEditingPerformance(null);
    },
  });

  const deletePerformanceMutation = useMutation({
    mutationFn: deleteStudentPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", id] });
      toast({
        title: "Performance supprimée",
        description: "La performance a été supprimée avec succès",
      });
    },
  });

  // Calculate subject averages
  const subjectAverages = useMemo(() => {
    const subjectMap = new Map<string, { totalGrade: number; totalMaxGrade: number; count: number }>();
    
    performances.forEach((performance) => {
      const subject = performance.subject;
      const grade = performance.grade;
      const maxGrade = performance.max_grade;
      
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, { totalGrade: 0, totalMaxGrade: 0, count: 0 });
      }
      
      const current = subjectMap.get(subject)!;
      subjectMap.set(subject, {
        totalGrade: current.totalGrade + grade,
        totalMaxGrade: current.totalMaxGrade + maxGrade,
        count: current.count + 1,
      });
    });
    
    const result = Array.from(subjectMap.entries()).map(([subject, data]) => {
      const averageGrade = data.totalGrade / data.count;
      const averageMaxGrade = data.totalMaxGrade / data.count;
      const percentage = (averageGrade / averageMaxGrade) * 100;
      
      return {
        subject,
        averageGrade: averageGrade.toFixed(2),
        averageMaxGrade: averageMaxGrade.toFixed(2),
        percentage: percentage.toFixed(2),
        count: data.count,
      };
    });
    
    return result;
  }, [performances]);
  
  // Calculate overall average
  const overallAverage = useMemo(() => {
    if (performances.length === 0) return { grade: "0", maxGrade: "0", percentage: "0" };
    
    const totalGrade = performances.reduce((sum, perf) => sum + perf.grade, 0);
    const totalMaxGrade = performances.reduce((sum, perf) => sum + perf.max_grade, 0);
    const percentage = totalMaxGrade > 0 ? (totalGrade / totalMaxGrade) * 100 : 0;
    
    return {
      grade: (totalGrade / performances.length).toFixed(2),
      maxGrade: (totalMaxGrade / performances.length).toFixed(2),
      percentage: percentage.toFixed(2),
    };
  }, [performances]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return subjectAverages.map(subject => ({
      name: subject.subject,
      moyenne: parseFloat(subject.averageGrade),
      percentage: parseFloat(subject.percentage),
    }));
  }, [subjectAverages]);

  const handleEditPerformance = (performance: StudentPerformanceType) => {
    setEditingPerformance(performance);
    setPerformanceFormOpen(true);
  };

  const handleSubmitPerformance = (data: StudentPerformanceFormData) => {
    if (editingPerformance) {
      updatePerformanceMutation.mutate({ 
        id: editingPerformance.id, 
        data 
      });
    } else {
      createPerformanceMutation.mutate(data);
    }
  };

  const handleAddNewPerformance = () => {
    setEditingPerformance(null);
    setPerformanceFormOpen(true);
  };

  if (isLoadingStudent) {
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

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="bg-white rounded-xl p-12 shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Élève non trouvé</h2>
            <p className="text-gray-500 mb-6">
              L'élève que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => navigate("/student-management")}>
              Retour à la liste des élèves
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <StudentPerformanceHeader student={student} id={id!} />
        <PerformanceSummaryCard overallAverage={overallAverage} />

        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list">Liste des évaluations</TabsTrigger>
              <TabsTrigger value="subjects">Par matière</TabsTrigger>
              <TabsTrigger value="chart">Graphiques</TabsTrigger>
            </TabsList>
            <Button 
              onClick={handleAddNewPerformance}
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une évaluation
            </Button>
          </div>

          <TabsContent value="list" className="space-y-4">
            <PerformanceListTab 
              performances={performances}
              isLoadingPerformances={isLoadingPerformances}
              isPerformancesError={isPerformancesError}
              handleEditPerformance={handleEditPerformance}
              handleAddNewPerformance={handleAddNewPerformance}
              deletePerformanceMutation={deletePerformanceMutation}
            />
          </TabsContent>

          <TabsContent value="subjects">
            <SubjectsTab 
              subjectAverages={subjectAverages}
              isLoadingPerformances={isLoadingPerformances}
            />
          </TabsContent>

          <TabsContent value="chart">
            <PerformanceChartTab 
              chartData={chartData}
              isLoadingPerformances={isLoadingPerformances}
            />
          </TabsContent>
        </Tabs>

        <StudentPerformanceForm
          studentId={id!}
          open={performanceFormOpen}
          onOpenChange={setPerformanceFormOpen}
          onSubmit={handleSubmitPerformance}
          isSubmitting={createPerformanceMutation.isPending || updatePerformanceMutation.isPending}
          initialData={editingPerformance}
          mode={editingPerformance ? "edit" : "create"}
        />
      </div>
    </div>
  );
};

export default StudentPerformance;
