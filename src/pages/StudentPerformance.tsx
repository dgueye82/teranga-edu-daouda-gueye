
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import PerformancePage from "@/components/students/performance/PerformancePage";
import PerformancePageError from "@/components/students/performance/PerformancePageError";

const StudentPerformance = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <PerformancePageError 
            title="ID d'élève manquant"
            description="L'identifiant de l'élève n'a pas été spécifié."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <PerformancePage studentId={id} />
      </div>
    </div>
  );
};

export default StudentPerformance;
