
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/services/schoolService";
import SchoolStudentsList from "@/components/schools/SchoolStudentsList";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SchoolStudents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: schools = [], isLoading, error, refetch } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Actualisation en cours",
      description: "Les données sont en cours de rechargement",
    });
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Impossible de charger les écoles. Veuillez réessayer plus tard.",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/school-management")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Élèves par école</h1>
              <p className="text-gray-600 mt-1">
                Visualisez les élèves inscrits dans chaque école
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : schools.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Aucune école trouvée</h2>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter des écoles dans la gestion des écoles
            </p>
            <Button onClick={() => navigate("/school-management")}>
              Gérer les écoles
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {schools.map((school) => (
              <SchoolStudentsList key={school.id} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolStudents;
