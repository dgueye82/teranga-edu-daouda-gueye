
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Redirect if already connected
  useEffect(() => {
    if (user && !isLoading) {
      console.log("User already connected, redirecting to home page");
      toast({
        title: "Déjà connecté",
        description: "Vous êtes déjà connecté à Teranga EDU",
      });

      const nextParam = new URLSearchParams(location.search).get("next");
      const safeNext = nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : null;
      const from = safeNext ?? location.state?.from?.pathname ?? "/";
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state, location.search, toast]);

  return (
    <AuthLayout authError={authError}>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="signin">Connexion</TabsTrigger>
          <TabsTrigger value="signup">Inscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin" className="mt-4">
          <LoginForm setAuthError={setAuthError} />
        </TabsContent>
        
        <TabsContent value="signup" className="mt-4">
          <RegisterForm setAuthError={setAuthError} />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Auth;
