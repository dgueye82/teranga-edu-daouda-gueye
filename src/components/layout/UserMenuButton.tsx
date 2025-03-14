
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, ShieldCheck, BookOpen, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const UserMenuButton = () => {
  const { user, signOut, userProfile, isAdmin, isTeacher } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Teranga EDU !",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message,
      });
    }
  };

  if (!user) {
    return (
      <Button asChild variant="outline" className="flex items-center gap-2">
        <Link to="/auth">
          <User className="h-4 w-4" />
          <span>Se connecter</span>
        </Link>
      </Button>
    );
  }

  const getRoleBadge = () => {
    if (isAdmin) {
      return <Badge className="ml-2 bg-purple-500">Admin</Badge>;
    } else if (isTeacher) {
      return <Badge className="ml-2 bg-blue-500">Enseignant</Badge>;
    }
    return null;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{userProfile?.first_name || user.email?.split('@')[0] || 'Utilisateur'}</span>
          {getRoleBadge()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {userProfile?.email || user.email}
          {getRoleBadge()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/school-management">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Administration
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        {isTeacher && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/student-management">
                <User className="h-4 w-4 mr-2" />
                Gestion des élèves
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Cours et exercices
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/profile">Mon profil</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
