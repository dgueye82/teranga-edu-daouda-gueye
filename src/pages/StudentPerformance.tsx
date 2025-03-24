
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentById } from "@/services/student";
import { getStudentPerformances, createStudentPerformance, updateStudentPerformance, deleteStudentPerformance, calculateStudentAverage } from "@/services/student/performanceService";
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
  const [averageInfo, setAverageInfo] = useState<{
    overallAverage: number;
    percentage: number;
    totalGrade: number;
    totalMaxGrade: number;
    subjectAverages: Array<{
      subject: string;
      average: number;
      maxGrade: number;
      percentage: number;
      count: number;
    }>;
  } | null>(null);

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

  // Fetch the average calculations
  useEffect(() => {
    const fetchAverages = async () => {
      if (!id) return;
      try {
        const averageData = await calculateStudentAverage(id);
        setAverageInfo(averageData);
      } catch (error) {
        console.error("Error calculating averages:", error);
      }
    };
    
    fetchAverages();
  }, [id, performances]);

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

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!averageInfo) return [];
    
    return averageInfo.subjectAverages.map(subject => ({
      name: subject.subject,
      moyenne: subject.average,
      percentage: subject.percentage,
    }));
  }, [averageInfo]);

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

  // Calculate summary data for the card
  const summaryData = averageInfo ? {
    grade: averageInfo.overallAverage.toFixed(2),
    maxGrade: "20",
    percentage: averageInfo.percentage.toFixed(2)
  } : {
    grade: "0",
    maxGrade: "0",
    percentage: "0"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <StudentPerformanceHeader 
          student={student} 
          id={id!} 
          averageInfo={averageInfo ? {
            overallAverage: averageInfo.overallAverage,
            percentage: averageInfo.percentage
          } : undefined}
        />
        <PerformanceSummaryCard overallAverage={summaryData} />

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
              subjectAverages={averageInfo?.subjectAverages.map(subj => ({
                subject: subj.subject,
                averageGrade: subj.average.toFixed(2),
                averageMaxGrade: subj.maxGrade.toFixed(2),
                percentage: subj.percentage.toFixed(2),
                count: subj.count
              })) || []}
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
