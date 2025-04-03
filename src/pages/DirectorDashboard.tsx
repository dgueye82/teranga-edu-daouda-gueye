
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

// Importing our new components
import AdminFeatures from "@/components/director/dashboard/AdminFeatures";
import OverviewTab from "@/components/director/dashboard/OverviewTab";
import StaffTab from "@/components/director/dashboard/StaffTab";
import StudentsTab from "@/components/director/dashboard/StudentsTab";
import AdministrativeTab from "@/components/director/dashboard/AdministrativeTab";
import DashboardFooter from "@/components/director/dashboard/DashboardFooter";

const DirectorDashboard = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord du Directeur</h1>
          <p className="text-gray-600 mt-1">
            Gérez efficacement votre établissement scolaire
          </p>
        </div>

        <AdminFeatures isAdmin={isAdmin} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="staff">Personnel</TabsTrigger>
            <TabsTrigger value="students">Élèves</TabsTrigger>
            <TabsTrigger value="administrative">Administration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <StaffTab />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="administrative" className="space-y-6">
            <AdministrativeTab />
          </TabsContent>
        </Tabs>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default DirectorDashboard;
