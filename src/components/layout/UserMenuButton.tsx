
import { User, LogIn, LogOut } from "lucide-react";
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

const UserMenuButton = () => {
  const { user, signOut, isAdmin, isTeacher } = useAuth();
  const navigate = useNavigate();

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
        {user ? (
          <>
            <div className="px-2 py-1.5 text-sm font-medium">
              {user.email}
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
