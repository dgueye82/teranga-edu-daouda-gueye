
import { X, LogIn, LogOut, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut, isAdmin, userProfile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
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
          <div className="py-3 px-4 mb-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-teranga-blue" />
              <div>
                <p className="font-medium text-teranga-blue">{user.email}</p>
                {userProfile?.role && (
                  <p className="text-xs text-gray-500">Rôle: {userProfile.role}</p>
                )}
              </div>
            </div>
          </div>
        )}
      
        <Link to="/" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Accueil
        </Link>
        <Link to="/about" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          À propos
        </Link>
        <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer l'école
        </Link>
        <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer le personnel
        </Link>
        <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer l'élève
        </Link>
        <Link to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Formation en ligne
        </Link>
        <Link to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Programme d'études et évaluation
        </Link>
        <Link to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Portails parents
        </Link>
        
        <div className="pt-4 mt-auto">
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="w-full"
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
          
          {isAdmin && (
            <Link to="/admin/users" onClick={onClose}>
              <Button variant="outline" className="w-full mt-2">
                Gestion des utilisateurs
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
