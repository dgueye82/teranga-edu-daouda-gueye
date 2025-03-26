
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  getStudentById,
  getStudentPerformances, 
  createStudentPerformance, 
  updateStudentPerformance, 
  deleteStudentPerformance,
  calculateStudentAverage
} from "@/services/student";
import { StudentPerformance, StudentPerformanceFormData } from "@/types/student";

export const useStudentPerformanceData = (studentId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [performanceFormOpen, setPerformanceFormOpen] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState<StudentPerformance | null>(null);
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

  // Fetch student data
  const { 
    data: student, 
    isLoading: isLoadingStudent 
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentById(studentId),
    enabled: !!studentId,
  });

  // Fetch student performances
  const { 
    data: performances = [], 
    isLoading: isLoadingPerformances,
    isError: isPerformancesError
  } = useQuery({
    queryKey: ["studentPerformances", studentId],
    queryFn: () => getStudentPerformances(studentId),
    enabled: !!studentId,
  });

  // Fetch the average calculations
  useEffect(() => {
    const fetchAverages = async () => {
      if (!studentId) return;
      try {
        const averageData = await calculateStudentAverage(studentId);
        setAverageInfo(averageData);
      } catch (error) {
        console.error("Error calculating averages:", error);
      }
    };
    
    fetchAverages();
  }, [studentId, performances]);

  // Create mutation
  const createPerformanceMutation = useMutation({
    mutationFn: createStudentPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", studentId] });
      toast({
        title: "Performance ajoutée",
        description: "La performance a été ajoutée avec succès",
      });
      setPerformanceFormOpen(false);
      setEditingPerformance(null);
    },
  });

  // Update mutation
  const updatePerformanceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudentPerformanceFormData> }) => 
      updateStudentPerformance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", studentId] });
      toast({
        title: "Performance mise à jour",
        description: "La performance a été mise à jour avec succès",
      });
      setPerformanceFormOpen(false);
      setEditingPerformance(null);
    },
  });

  // Delete mutation
  const deletePerformanceMutation = useMutation({
    mutationFn: deleteStudentPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPerformances", studentId] });
      toast({
        title: "Performance supprimée",
        description: "La performance a été supprimée avec succès",
      });
    },
  });

  // Form handlers
  const handleEditPerformance = (performance: StudentPerformance) => {
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

  return {
    student,
    performances,
    averageInfo,
    isLoadingStudent,
    isLoadingPerformances,
    isPerformancesError,
    performanceFormOpen,
    setPerformanceFormOpen,
    editingPerformance,
    createPerformanceMutation,
    updatePerformanceMutation,
    deletePerformanceMutation,
    handleEditPerformance,
    handleSubmitPerformance,
    handleAddNewPerformance
  };
};
