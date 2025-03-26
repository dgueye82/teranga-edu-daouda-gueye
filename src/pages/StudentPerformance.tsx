
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import PerformancePage from "@/components/students/performance/PerformancePage";

const StudentPerformance = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="bg-white rounded-xl p-12 shadow text-center">
            <h2 className="text-xl font-semibold mb-4">ID d'élève manquant</h2>
            <p className="text-gray-500">
              L'identifiant de l'élève n'a pas été spécifié.
            </p>
          </div>
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
