
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { UserRound, CheckCircle } from "lucide-react";
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
      
      // Show welcome toast for logged in user - sans propriété icon
      toast({
        title: "Connecté avec succès",
        description: `Bienvenue ${userProfile?.first_name || user.email?.split('@')[0]}!`,
        variant: "default"
      });
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state, toast, userProfile]);

  // Afficher un message visuel lorsqu'un utilisateur vient de se connecter
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (user) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <AuthLayout authError={authError}>
      {showSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-green-700">Connexion réussie!</AlertTitle>
          <AlertDescription className="text-green-600">
            Vous êtes maintenant connecté en tant que {userProfile?.first_name || user?.email?.split('@')[0]}
          </AlertDescription>
        </Alert>
      )}
      
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
