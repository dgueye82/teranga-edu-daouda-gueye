
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import ReportCard from "@/components/students/report-card/ReportCard";
import { getStudentReportCard } from "@/services/student/performanceService";

const StudentReportCard = () => {
  const { id } = useParams<{ id: string }>();
  const [reportData, setReportData] = useState<any | null>(null);
  const [trimester, setTrimester] = useState<string>("Trimestre 1");
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getStudentReportCard(id, trimester);
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report card data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du bulletin",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id, trimester, toast]);

  if (!id) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ID d'élève manquant</h2>
            <p className="text-gray-600 mb-6">L'identifiant de l'élève n'a pas été spécifié.</p>
            <Button onClick={() => navigate("/student-management")}>
              Retour à la liste des élèves
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white print:bg-white print:min-h-0">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16 print:mt-0 print:p-0">
        <div className="print:hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/student/${id}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold">Bulletin de notes</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Période:</span>
              <Select 
                value={trimester} 
                onValueChange={setTrimester}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choisir un trimestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trimestre 1">Trimestre 1</SelectItem>
                  <SelectItem value="Trimestre 2">Trimestre 2</SelectItem>
                  <SelectItem value="Trimestre 3">Trimestre 3</SelectItem>
                  <SelectItem value="Année complète">Année complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : reportData ? (
          <ReportCard 
            student={reportData.student}
            averageInfo={reportData.averageInfo}
            performances={reportData.performances}
            trimestre={trimester}
          />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Aucune donnée disponible</h2>
            <p className="text-gray-600 mb-6">
              Il n'y a pas de données disponibles pour générer un bulletin de notes pour cet élève.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReportCard;
