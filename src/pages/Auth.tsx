
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const { user, isLoading, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !isLoading) {
      console.log("Utilisateur déjà connecté, redirection vers la page d'accueil");
      
      // Show welcome toast for logged in user
      toast({
        title: "Connecté avec succès",
        description: `Bienvenue ${userProfile?.first_name || user.email?.split('@')[0]}!`,
        variant: "default",
        icon: <UserRound className="h-4 w-4 text-green-500" />
      });
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state, toast, userProfile]);

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
