
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  authError: string | null;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authError }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teranga-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">TERANGA EDU</h1>
          <p className="text-gray-600 mt-2">Plateforme de gestion scolaire</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {authError}
            </div>
          )}
          
          {children}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
