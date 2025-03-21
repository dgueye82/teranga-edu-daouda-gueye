
import { X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut, isAdmin, isTeacher } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log("Déconnexion mobile en cours...");
      await signOut();
      // La redirection est gérée dans signOutUser directement
      onClose();
    } catch (error: any) {
      console.error("Erreur de déconnexion mobile:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  console.log("MobileMenu - Auth state:", { isAdmin, isTeacher });

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
        <Link to="/" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Accueil
        </Link>
        <Link to="/about" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          À propos
        </Link>
        
        {isAdmin && (
          <>
            <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer l'école
            </Link>
            <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
              Gérer le personnel
            </Link>
          </>
        )}
        
        {(isAdmin || isTeacher) && (
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
            Gérer l'élève
          </Link>
        )}
        
        <Link to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Formation en ligne
        </Link>
        <Link to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Programme d'études et évaluation
        </Link>
        <Link to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Portails parents
        </Link>
        
        {user ? (
          <Button 
            onClick={handleSignOut}
            className="flex items-center py-2 gap-2 text-lg font-medium text-red-500 justify-start"
            variant="outline"
            type="button"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </Button>
        ) : (
          <Link to="/auth" className="py-2 text-lg font-medium border-b border-gray-100 text-blue-600" onClick={onClose}>
            Se connecter
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
