
import { X, LogIn, LogOut } from "lucide-react";
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

  // Log user role information
  console.log("MobileMenu - User roles:", { 
    isAdmin, 
    isTeacher, 
    isDirector, 
    isSecretary, 
    isParent, 
    isStudent, 
    isInspector, 
    isSchoolLife,
    userProfile: userProfile?.role
  });

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
        
        {/* Menu administrateur */}
        {isAdmin && (
          <>
            <Link to="/admin/users" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gestion des utilisateurs
            </Link>
            <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Tableau de bord admin
            </Link>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer les écoles
            </Link>
            <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer le personnel
            </Link>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer les élèves
            </Link>
          </>
        )}
        
        {/* Menu directeur */}
        {isDirector && !isAdmin && (
          <>
            <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Tableau de bord directeur
            </Link>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer l'école
            </Link>
            <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer le personnel
            </Link>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer les élèves
            </Link>
          </>
        )}
        
        {/* Menu secrétaire */}
        {isSecretary && !isAdmin && !isDirector && (
          <>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Administration
            </Link>
            <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Personnel
            </Link>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Inscriptions
            </Link>
          </>
        )}
        
        {/* Menu enseignant */}
        {isTeacher && !isAdmin && !isDirector && !isSecretary && (
          <>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Classes & Élèves
            </Link>
            <Link to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Programme d'études
            </Link>
          </>
        )}
        
        {/* Menu inspecteur */}
        {isInspector && !isAdmin && (
          <>
            <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Tableau de bord
            </Link>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Supervision des écoles
            </Link>
          </>
        )}
        
        {/* Menu vie scolaire */}
        {isSchoolLife && !isAdmin && (
          <>
            <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Suivi des élèves
            </Link>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Activités scolaires
            </Link>
          </>
        )}
        
        {/* Menu parent */}
        {isParent && !isAdmin && (
          <Link to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Espace parent
          </Link>
        )}
        
        {/* Menu élève */}
        {isStudent && !isAdmin && (
          <Link to="/student-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Espace élève
          </Link>
        )}
        
        {/* Formation en ligne - accessible à tous les utilisateurs connectés */}
        {user && (
          <Link to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Formation en ligne
          </Link>
        )}
        
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
