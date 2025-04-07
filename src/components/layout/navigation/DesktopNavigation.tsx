
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserMenuButton from "../UserMenuButton";

const DesktopNavigation = () => {
  const { isAdmin, isTeacher, user, userProfile } = useAuth();

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        À propos
      </Link>
      
      {/* Show director dashboard for admin and teachers */}
      {(isAdmin || isTeacher) && user && (
        <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Tableau de bord directeur
        </Link>
      )}
      
      <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'école
      </Link>
      <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer le personnel
      </Link>
      <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Gérer l'élève
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
      
      {/* User menu button for desktop */}
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
