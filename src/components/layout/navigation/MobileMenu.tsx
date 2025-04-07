
import { X, LogIn, LogOut, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut, isAdmin, userProfile, isTeacher, isDirector, isParent, isStudent, isSecretary, isInspector, isSchoolLife } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Get user initials for avatar
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
    <div
      className={`fixed inset-0 lg:hidden bg-white z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5"
        aria-label="Fermer le menu"
        type="button"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6 overflow-y-auto">
        {user && (
          <div className="py-4 px-4 mb-2 bg-gray-50 rounded-lg flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-teranga-blue">
              <AvatarFallback className="bg-teranga-blue text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-teranga-blue">
                {userProfile?.first_name} {userProfile?.last_name || user.email?.split('@')[0]}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
              {userProfile?.role && (
                <span className="inline-block text-xs mt-1 bg-gray-200 px-2 py-0.5 rounded-full">
                  {getRoleDisplayName(userProfile.role)}
                </span>
              )}
            </div>
          </div>
        )}
      
        <Link to="/" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Accueil
        </Link>
        
        <Link to="/about" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          À propos
        </Link>
        
        {/* Admin specific links */}
        {isAdmin && (
          <>
            <Link to="/admin/users" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gestion des utilisateurs
            </Link>
            <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Tableau de bord administrateur
            </Link>
          </>
        )}
        
        {/* Director specific links */}
        {isDirector && (
          <>
            <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Tableau de bord directeur
            </Link>
            <Link to="/director/staff" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gestion du personnel
            </Link>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer l'école
            </Link>
          </>
        )}
        
        {/* Teacher specific links */}
        {isTeacher && (
          <>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer les élèves
            </Link>
            <Link to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Programme d'études et évaluation
            </Link>
          </>
        )}
        
        {/* Secretary specific links */}
        {isSecretary && (
          <>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer l'école
            </Link>
            <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer le personnel
            </Link>
          </>
        )}
        
        {/* Parent specific links */}
        {isParent && (
          <Link to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Portail parent
          </Link>
        )}
        
        {/* Student specific links */}
        {isStudent && (
          <Link to="/student-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Portail élève
          </Link>
        )}
        
        {/* General links shown to all users */}
        <Link to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Formation en ligne
        </Link>
        
        <div className="pt-4 mt-auto">
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          ) : (
            <Link to="/auth" onClick={onClose}>
              <Button variant="default" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
