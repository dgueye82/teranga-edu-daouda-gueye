
import { X } from "lucide-react";
import NavLink from "./NavLink";

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
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6 overflow-y-auto">
        <NavLink to="/about" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          À propos
        </NavLink>
        <NavLink to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Gérer l'école
        </NavLink>
        <NavLink to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Gérer l'élève
        </NavLink>
        <NavLink to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Gérer le personnel
        </NavLink>
        <NavLink to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Formation en ligne
        </NavLink>
        <NavLink to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Programme d'études et évaluation
        </NavLink>
        <NavLink to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100" onClick={onClose}>
          Portails parents
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
