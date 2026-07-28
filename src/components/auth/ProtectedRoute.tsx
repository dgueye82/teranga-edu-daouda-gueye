
import React, { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { can, type Permission } from "@/lib/permissions";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  permission?: Permission;
}

const ProtectedRoute = ({ allowedRoles, permission }: ProtectedRouteProps = {}) => {
  const { user, isLoading, userProfile, createUserProfileIfMissing } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !userProfile && !isLoading) {
      createUserProfileIfMissing();
    }
  }, [user, isLoading, userProfile, createUserProfileIfMissing]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Configuration du profil</h1>
        <p className="text-muted-foreground mb-4">Nous configurons votre profil utilisateur...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
      </div>
    );
  }

  const userRole = userProfile.role;

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    toast({
      title: "Accès non autorisé",
      description: "Votre rôle ne permet pas d'accéder à cette page.",
      variant: "destructive",
    });
    return <Navigate to="/unauthorized" replace />;
  }

  if (permission && !can(userRole, permission)) {
    toast({
      title: "Accès non autorisé",
      description: "Vous n'avez pas les droits nécessaires pour cette section.",
      variant: "destructive",
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
