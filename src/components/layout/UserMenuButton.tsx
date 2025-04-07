
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserMenuButton = () => {
  const { user, signOut, isAdmin, isTeacher, isDirector, isParent, isStudent, isSecretary, isInspector, isSchoolLife, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to display login status toast
  const showLoginStatus = () => {
    if (user) {
      toast({
        title: "Connecté",
        description: `Vous êtes connecté en tant que ${user.email}${userProfile ? ' ('+userProfile.role+')' : ''}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Non connecté",
        description: "Vous n'êtes pas connecté",
        variant: "default"
      });
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    } else if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    } else {
      return "TE"; // Default for Teranga Edu
    }
  };

  // Helper function to get role-specific display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'teacher': return 'Enseignant';
      case 'director': return 'Directeur';
      case 'secretary': return 'Secrétaire';
      case 'parent': return 'Parent';
      case 'student': return 'Élève';
      case 'inspector': return 'Inspecteur';
      case 'school_life': return 'Vie Scolaire';
      default: return role;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button
            variant="ghost"
            className="relative flex items-center gap-2 px-2 py-1.5 rounded-full"
            aria-label="Menu utilisateur"
          >
            <Avatar className="h-8 w-8 border-2 border-teranga-blue">
              <AvatarFallback className="bg-teranga-blue text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block text-sm font-medium">
              {userProfile?.first_name || user.email?.split('@')[0]}
            </span>
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-full"
            aria-label="Menu utilisateur"
          >
            <User className="h-5 w-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {user ? (
          <>
            <div className="px-4 py-3 text-sm font-medium text-teranga-blue">
              <div className="font-bold">{userProfile?.first_name} {userProfile?.last_name || user.email?.split('@')[0]}</div>
              <div className="text-xs text-gray-500 mt-1">{user.email}</div>
              {userProfile?.role && (
                <span className="block text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full w-fit">
                  {getRoleDisplayName(userProfile.role)}
                </span>
              )}
            </div>
            <DropdownMenuSeparator />
            
            {/* Menu administrateur */}
            {isAdmin && (
              <>
                <DropdownMenuItem onClick={() => navigate('/admin/users')} className="cursor-pointer">
                  Gestion des utilisateurs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/director-dashboard')} className="cursor-pointer">
                  Tableau de bord
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/school-management')} className="cursor-pointer">
                  Gérer les écoles
                </DropdownMenuItem>
              </>
            )}
            
            {/* Menu directeur */}
            {isDirector && !isAdmin && (
              <>
                <DropdownMenuItem onClick={() => navigate('/director-dashboard')} className="cursor-pointer">
                  Tableau de bord directeur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/school-management')} className="cursor-pointer">
                  Gérer l'école
                </DropdownMenuItem>
              </>
            )}
            
            {/* Menu secrétaire */}
            {isSecretary && !isAdmin && !isDirector && (
              <>
                <DropdownMenuItem onClick={() => navigate('/school-management')} className="cursor-pointer">
                  Administration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/student-management')} className="cursor-pointer">
                  Inscriptions
                </DropdownMenuItem>
              </>
            )}
            
            {/* Menu enseignant */}
            {isTeacher && !isAdmin && !isDirector && !isSecretary && (
              <>
                <DropdownMenuItem onClick={() => navigate('/student-management')} className="cursor-pointer">
                  Classes & Élèves
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/curriculum')} className="cursor-pointer">
                  Programme d'études
                </DropdownMenuItem>
              </>
            )}
            
            {/* Menu inspecteur */}
            {isInspector && (
              <>
                <DropdownMenuItem onClick={() => navigate('/director-dashboard')} className="cursor-pointer">
                  Tableau de bord
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/school-management')} className="cursor-pointer">
                  Supervision des écoles
                </DropdownMenuItem>
              </>
            )}
            
            {/* Menu vie scolaire */}
            {isSchoolLife && (
              <DropdownMenuItem onClick={() => navigate('/student-management')} className="cursor-pointer">
                Suivi des élèves
              </DropdownMenuItem>
            )}
            
            {/* Menu parent */}
            {isParent && !isAdmin && (
              <DropdownMenuItem onClick={() => navigate('/parent-portal')} className="cursor-pointer">
                Espace parent
              </DropdownMenuItem>
            )}
            
            {/* Menu élève */}
            {isStudent && !isAdmin && (
              <DropdownMenuItem onClick={() => navigate('/student-portal')} className="cursor-pointer">
                Espace élève
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            {/* Option de déconnexion pour tous les utilisateurs */}
            <DropdownMenuItem onClick={signOut} className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => navigate('/auth')} className="cursor-pointer">
            <LogIn className="mr-2 h-4 w-4" />
            Connexion
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
