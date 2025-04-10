
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !isLoading) {
      console.log("Utilisateur déjà connecté, redirection vers la page d'accueil");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state]);

  return (
    <AuthLayout authError={authError}>
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="signin">Connexion</TabsTrigger>
          <TabsTrigger value="signup">Inscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <LoginForm setAuthError={setAuthError} />
        </TabsContent>
        
        <TabsContent value="signup">
          <RegisterForm setAuthError={setAuthError} />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Auth;
