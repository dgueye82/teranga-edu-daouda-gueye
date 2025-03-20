
import { LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenuButton = () => {
  const { user, userProfile, signOut, createUserProfileIfMissing, isAdmin, isTeacher } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log("Déconnexion en cours...");
      await signOut();
      // Ne pas utiliser navigate ici, la redirection est gérée dans signOut
    } catch (error: any) {
      console.error("Erreur de déconnexion:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  const handleCreateProfile = async () => {
    await createUserProfileIfMissing();
    toast({
      title: "Vérification du profil",
      description: "Votre profil utilisateur a été vérifié.",
    });
  };

  console.log("UserMenuButton - Auth state:", { 
    userEmail: user?.email,
    userProfile,
    isAdmin,
    isTeacher
  });

  if (!user) {
    return (
      <Button 
        onClick={() => navigate('/auth')}
        className="ml-4"
        variant="default"
      >
        Se connecter
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-full"
          aria-label="User menu"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start">
          <span className="font-medium">{userProfile?.first_name || user.email}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
          <span className="text-xs text-muted-foreground mt-1 bg-slate-100 px-2 py-0.5 rounded-full">
            Rôle: {userProfile?.role || "Non défini"}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!userProfile && (
          <DropdownMenuItem 
            onSelect={(e) => { e.preventDefault(); handleCreateProfile(); }}
            className="text-yellow-600 cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Créer mon profil</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
