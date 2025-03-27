
import { Menu, X } from "lucide-react";
import UserMenuButton from "../UserMenuButton";

export interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = ({ isOpen, onToggle }: MobileMenuToggleProps) => {
  return (
    <div className="lg:hidden flex items-center space-x-4">
      <UserMenuButton />
      <button
        onClick={onToggle}
        className="text-gray-700 hover:text-teranga-blue focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default MobileMenuToggle;
