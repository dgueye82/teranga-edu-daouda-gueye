
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StudentPerformanceHeader from "./StudentPerformanceHeader";
import PerformanceSummaryCard from "./PerformanceSummaryCard";
import PerformanceListTab from "./PerformanceListTab";
import SubjectsTab from "./SubjectsTab";
import PerformanceChartTab from "./PerformanceChartTab";
import StudentPerformanceForm from "@/components/students/StudentPerformanceForm";
import { useStudentPerformanceData } from "./hooks/useStudentPerformanceData";
import PerformancePageLoading from "./PerformancePageLoading";
import PerformancePageError from "./PerformancePageError";

interface PerformancePageProps {
  studentId: string;
}

const PerformancePage: React.FC<PerformancePageProps> = ({ studentId }) => {
  const navigate = useNavigate();
  const {
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
  } = useStudentPerformanceData(studentId);

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

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!averageInfo) return [];
    
    return averageInfo.subjectAverages.map(subject => ({
      name: subject.subject,
      moyenne: subject.average,
      percentage: subject.percentage,
    }));
  }, [averageInfo]);

  if (isLoadingStudent) {
    return <PerformancePageLoading />;
  }

  if (!student) {
    return (
      <PerformancePageError 
        title="Élève non trouvé"
        description="L'élève que vous recherchez n'existe pas ou a été supprimé."
      />
    );
  }

  return (
    <>
      <StudentPerformanceHeader 
        student={student} 
        id={studentId} 
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
        studentId={studentId}
        open={performanceFormOpen}
        onOpenChange={setPerformanceFormOpen}
        onSubmit={handleSubmitPerformance}
        isSubmitting={createPerformanceMutation.isPending || updatePerformanceMutation.isPending}
        initialData={editingPerformance}
        mode={editingPerformance ? "edit" : "create"}
      />
    </>
  );
};

export default PerformancePage;
