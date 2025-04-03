
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users } from "lucide-react";

interface AdminFeaturesProps {
  isAdmin: boolean;
}

const AdminFeatures = ({ isAdmin }: AdminFeaturesProps) => {
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 className="text-lg font-semibold text-blue-700 flex items-center">
        <Shield className="h-5 w-5 mr-2" />
        Fonctionnalités d'Administration
      </h2>
      <p className="mt-1 text-blue-600 mb-3">
        En tant qu'administrateur, vous avez accès à des outils supplémentaires.
      </p>
      <Link 
        to="/admin/users" 
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Users className="h-4 w-4 mr-2" />
        Gestion des Utilisateurs
      </Link>
    </div>
  );
};

export default AdminFeatures;
