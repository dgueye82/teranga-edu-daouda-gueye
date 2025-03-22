
import { useState } from "react";
import { signUpWithEmailPassword } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserRole } from "@/types/auth";

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
  const [role, setRole] = useState<UserRole>("teacher");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Attempting to register with:", email, firstName, lastName, role);
      
      const data = await signUpWithEmailPassword(email, password, firstName, lastName, role);
      
      console.log("Registration result:", data);
      
      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      
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
      
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Rôle
        </label>
        <Select
          value={role}
          onValueChange={(value) => setRole(value as UserRole)}
        >
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder="Sélectionnez un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="teacher">Professeur</SelectItem>
            <SelectItem value="student">Élève</SelectItem>
            <SelectItem value="parent">Parent</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Note: L'email dagueye82@gmail.com est automatiquement assigné le rôle "admin".
        </p>
      </div>
      
      <Button type="submit" className="w-full bg-teranga-blue" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>Inscription en cours...</span>
          </div>
        ) : "S'inscrire"}
      </Button>
    </form>
  );
};

export default RegisterForm;
