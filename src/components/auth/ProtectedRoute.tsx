
import React, { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "teacher")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps = {}) => {
  const { user, isLoading, userProfile, createUserProfileIfMissing } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.log("ProtectedRoute - État d'authentification:", { 
      user: user?.id, 
      isLoading, 
      userProfile,
      allowedRoles,
      currentPath: location.pathname
    });

    // Si l'utilisateur est authentifié mais n'a pas de profil, essayer de créer un profil
    if (user && !userProfile && !isLoading) {
      createUserProfileIfMissing();
    }
  }, [user, isLoading, userProfile, allowedRoles, location.pathname, createUserProfileIfMissing]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log("Utilisateur non authentifié, redirection vers /auth");
    toast({
      title: "Authentification requise",
      description: "Veuillez vous connecter pour accéder à cette page",
      variant: "destructive"
    });
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Si l'utilisateur est authentifié mais n'a pas de profil
  if (!userProfile) {
    console.log("L'utilisateur n'a pas de profil, essai de création");
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Configuration du profil</h1>
        <p className="text-gray-600 mb-4">Nous configurons votre profil utilisateur...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
      </div>
    );
  }

  // If specific roles are required and user doesn't have the right role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userProfile?.role;
    console.log("Vérification des rôles:", { userRole, allowedRoles });
    
    if (!userRole || !allowedRoles.includes(userRole as any)) {
      console.log("Rôle non autorisé, redirection vers /unauthorized");
      toast({
        title: "Accès non autorisé",
        description: `Vous n'avez pas les permissions nécessaires pour accéder à cette page. Rôle requis: ${allowedRoles.join(' ou ')}`,
        variant: "destructive"
      });
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log("Accès autorisé à la route protégée");
  return <Outlet />;
};

export default ProtectedRoute;
