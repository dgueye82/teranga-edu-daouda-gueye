
import NavLink from "./NavLink";
import UserMenuButton from "../UserMenuButton";
import { Link } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        À propos
      </Link>
      <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'école
      </Link>
      <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'élève
      </Link>
      <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer le personnel
      </Link>
      <Link to="/online-training" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Formation en ligne
      </Link>
      <Link to="/curriculum" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Programme d'études et évaluation
      </Link>
      <Link to="/parent-portal" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Portails parents
      </Link>
      
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
