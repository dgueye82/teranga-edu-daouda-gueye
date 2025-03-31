
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UserRoleManagement from "@/components/admin/UserRoleManagement";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Only allow admins to access this page
  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/director-dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-1">
              Gérez les droits d'accès et l'impersonification des comptes
            </p>
          </div>
        </div>

        <UserRoleManagement />
      </main>
    </div>
  );
};

export default UserManagement;
