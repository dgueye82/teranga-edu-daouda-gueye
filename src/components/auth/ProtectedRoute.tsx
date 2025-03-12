
import React, { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "teacher")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps = {}) => {
  const { user, isLoading, userProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute - État d'authentification:", { 
      user: user?.id, 
      isLoading, 
      userProfile,
      allowedRoles,
      currentPath: location.pathname
    });
  }, [user, isLoading, userProfile, allowedRoles, location.pathname]);

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
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If specific roles are required and user doesn't have the right role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userProfile?.role;
    console.log("Vérification des rôles:", { userRole, allowedRoles });
    
    if (!userRole || !allowedRoles.includes(userRole as any)) {
      console.log("Rôle non autorisé, redirection vers /unauthorized");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log("Accès autorisé à la route protégée");
  return <Outlet />;
};

export default ProtectedRoute;
