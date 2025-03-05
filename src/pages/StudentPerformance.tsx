import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentById } from "@/services/student";
import { getStudentPerformances, createStudentPerformance, updateStudentPerformance, deleteStudentPerformance } from "@/services/student/performanceService";
import { StudentPerformance as StudentPerformanceType, StudentPerformanceFormData } from "@/types/student";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, PlusCircle, LineChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentPerformanceForm from "@/components/students/StudentPerformanceForm";

const StudentPerformance = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [performanceFormOpen, setPerformanceFormOpen] = useState(false);

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

  const getAvatarFallback = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getPerformanceColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const handleSubmitPerformance = (data: StudentPerformanceFormData) => {
    createPerformanceMutation.mutate(data);
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/student-management")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                <AvatarFallback className="bg-teranga-blue text-white">
                  {getAvatarFallback(student.first_name, student.last_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.first_name} {student.last_name}</h1>
                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">
                    {student.school_name || "Aucune école assignée"}
                  </p>
                  <Badge className={`ml-2 ${
                    student.status === "active" ? "bg-green-100 text-green-800" :
                    student.status === "inactive" ? "bg-gray-100 text-gray-800" :
                    student.status === "graduated" ? "bg-blue-100 text-blue-800" :
                    student.status === "suspended" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {student.status === "active" && "Actif"}
                    {student.status === "inactive" && "Inactif"}
                    {student.status === "graduated" && "Diplômé"}
                    {student.status === "suspended" && "Suspendu"}
                    {!student.status && "Non défini"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate(`/student-management/details/${id}`)}
              variant="outline"
              size="sm"
              className="text-gray-600"
            >
              Détails
            </Button>
            <Button
              onClick={() => navigate(`/student-management/attendance/${id}`)}
              variant="outline"
              size="sm"
              className="text-green-600"
            >
              Présence
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <LineChart className="h-4 w-4 mr-2" />
              Notes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list">Liste des évaluations</TabsTrigger>
              <TabsTrigger value="chart">Graphiques</TabsTrigger>
            </TabsList>
            <Button 
              onClick={() => setPerformanceFormOpen(true)}
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une évaluation
            </Button>
          </div>

          <TabsContent value="list" className="space-y-4">
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
                      onClick={() => setPerformanceFormOpen(true)}
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
                          <th className="px-4 py-2 text-left font-medium text-gray-500">Type</th>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">Note</th>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performances.map((performance) => (
                          <tr key={performance.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{new Date(performance.evaluation_date).toLocaleDateString()}</td>
                            <td className="px-4 py-3">{performance.subject}</td>
                            <td className="px-4 py-3">{performance.evaluation_type}</td>
                            <td className="px-4 py-3">
                              <span className={getPerformanceColor(performance.grade, performance.max_grade)}>
                                {performance.grade} / {performance.max_grade}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">Modifier</Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => deletePerformanceMutation.mutate(performance.id)}
                                >
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
          </TabsContent>

          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Graphiques de performances</CardTitle>
                <CardDescription>
                  Visualisation des performances scolaires
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoadingPerformances ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                  </div>
                ) : performances.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune donnée disponible pour afficher les graphiques</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Les graphiques seront disponibles dans une prochaine mise à jour</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <StudentPerformanceForm
          studentId={id!}
          open={performanceFormOpen}
          onOpenChange={setPerformanceFormOpen}
          onSubmit={handleSubmitPerformance}
          isSubmitting={createPerformanceMutation.isPending}
        />
      </div>
    </div>
  );
};

export default StudentPerformance;
