
import { User, LogIn, LogOut, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const UserMenuButton = () => {
  const { user, signOut, isAdmin, isTeacher, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to display login status toast
  const showLoginStatus = () => {
    if (user) {
      toast({
        title: "Connecté",
        description: `Vous êtes connecté en tant que ${user.email}`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-full relative"
          aria-label="User menu"
          onClick={showLoginStatus}
        >
          {user ? (
            <>
              <UserCheck className="h-5 w-5 text-teranga-blue" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
            </>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <div className="px-2 py-1.5 text-sm font-medium text-teranga-blue">
              {user.email}
              {userProfile?.role && (
                <span className="block text-xs text-gray-500 mt-1">
                  Rôle: {userProfile.role}
                </span>
              )}
            </div>
            <DropdownMenuSeparator />
            
            {isAdmin && (
              <DropdownMenuItem onClick={() => navigate('/admin/users')}>
                Gestion des utilisateurs
              </DropdownMenuItem>
            )}
            
            {(isAdmin || isTeacher) && (
              <DropdownMenuItem onClick={() => navigate('/director-dashboard')}>
                Tableau de bord
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => navigate('/auth')}>
            <LogIn className="mr-2 h-4 w-4" />
            Connexion
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
