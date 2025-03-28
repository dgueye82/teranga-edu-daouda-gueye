
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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
      </div>
    </div>
  );
};

export default MobileMenu;
