
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailPassword } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  setAuthError: (error: string | null) => void;
}

const LoginForm = ({ setAuthError }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createUserProfileIfMissing } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Tentative de connexion avec email:", email);
      
      // Connexion à Supabase
      const data = await signInWithEmailPassword(email, password);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à Teranga EDU",
      });

      // Création ou récupération du profil utilisateur
      console.log("Création du profil si nécessaire...");
      await createUserProfileIfMissing();
      
      console.log("Redirection vers la page d'accueil...");
      navigate("/");
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      
      let errorMessage = "Erreur de connexion. Vérifiez vos identifiants.";
      if (error.message) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Identifiants invalides. Vérifiez votre email et mot de passe.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuthError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="votreemail@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" className="w-full bg-teranga-blue" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};

export default LoginForm;
