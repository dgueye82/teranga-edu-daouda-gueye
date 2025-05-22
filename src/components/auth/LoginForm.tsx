
import { useState } from "react";
import { signInWithEmailPassword } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  setAuthError: (error: string | null) => void;
}

const LoginForm = ({ setAuthError }: LoginFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Attempting to sign in with email:", email);
      
      // Sign in with Supabase
      const data = await signInWithEmailPassword(email, password);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à Teranga EDU",
        variant: "default",
      });
      
      console.log("Authentication successful:", data);
      
      // Force reload to ensure all components get the updated state
      // Add a small delay to allow the toast to be shown
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error: any) {
      console.error("Error during sign in:", error);
      
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
          disabled={loading}
          autoComplete="email"
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
          disabled={loading}
          autoComplete="current-password"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-teranga-blue" 
        disabled={loading}
      >
        {loading ? 
          <div className="flex items-center justify-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>Connexion en cours...</span>
          </div> 
        : "Se connecter"}
      </Button>
    </form>
  );
};

export default LoginForm;
