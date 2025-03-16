
import { X, LogOut } from "lucide-react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
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
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message,
      });
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
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6 overflow-y-auto">
        <NavLink to="/about" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose} exact>
          À propos
        </NavLink>
        <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer l'école
        </Link>
        <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer l'élève
        </Link>
        <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onClose}>
          Gérer le personnel
        </Link>
        <NavLink to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose} exact>
          Formation en ligne
        </NavLink>
        <NavLink to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose} exact>
          Programme d'études et évaluation
        </NavLink>
        <NavLink to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose} exact>
          Portails parents
        </NavLink>
        
        {user && (
          <button 
            onClick={handleSignOut}
            className="flex items-center py-2 text-lg font-medium border-b border-gray-100 text-red-500"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
