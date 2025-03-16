
import NavLink from "./NavLink";
import UserMenuButton from "../UserMenuButton";
import { Link } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <NavLink to="/about" exact>
        À propos
      </NavLink>
      <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'école
      </Link>
      <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'élève
      </Link>
      <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer le personnel
      </Link>
      <NavLink to="/online-training" exact>
        Formation en ligne
      </NavLink>
      <NavLink to="/curriculum" exact>
        Programme d'études et évaluation
      </NavLink>
      <NavLink to="/parent-portal" exact>
        Portails parents
      </NavLink>
      
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
