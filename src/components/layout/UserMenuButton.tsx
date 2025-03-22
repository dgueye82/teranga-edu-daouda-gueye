
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
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      console.log("Signing out...");
      await signOut();
      // Redirect is handled in signOutUser
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleCreateProfile = async () => {
    try {
      await createUserProfileIfMissing();
      toast({
        title: "Vérification du profil",
        description: "Votre profil utilisateur a été vérifié.",
      });
      // Force reload to refresh UI
      window.location.reload();
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer votre profil utilisateur.",
      });
    }
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
            onClick={handleCreateProfile}
            className="text-yellow-600 cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Créer mon profil</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer"
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
              <span>Déconnexion en cours...</span>
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
