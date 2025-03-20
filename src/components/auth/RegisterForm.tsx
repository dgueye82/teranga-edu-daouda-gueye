
import { useState } from "react";
import { signUpWithEmailPassword } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  setAuthError: (error: string | null) => void;
}

const RegisterForm = ({ setAuthError }: RegisterFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Tentative d'inscription avec:", email, firstName, lastName);
      
      const data = await signUpWithEmailPassword(email, password, firstName, lastName);
      
      console.log("Résultat de l'inscription:", data);
      
      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte",
      });
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      
      let errorMessage = "Erreur d'inscription";
      if (error.message) {
        if (error.message.includes("User already registered")) {
          errorMessage = "Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuthError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <Input
            id="lastName"
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          id="signupEmail"
          type="email"
          placeholder="votreemail@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <Input
          id="signupPassword"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </div>
      
      <Button type="submit" className="w-full bg-teranga-blue" disabled={loading}>
        {loading ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </form>
  );
};

export default RegisterForm;
