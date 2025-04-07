
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserMenuButton from "../UserMenuButton";

const DesktopNavigation = () => {
  const { isAdmin, isTeacher, isDirector, isSecretary, isParent, isStudent, user } = useAuth();

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        À propos
      </Link>
      
      {/* Admin-specific navigation */}
      {isAdmin && user && (
        <>
          <Link to="/admin/users" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gestion des utilisateurs
          </Link>
          <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Tableau de bord
          </Link>
        </>
      )}
      
      {/* Director-specific navigation */}
      {isDirector && user && (
        <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Tableau de bord directeur
        </Link>
      )}
      
      {/* Show school management link for admin, director, and secretary roles */}
      {(isAdmin || isDirector || isSecretary) && user && (
        <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Gérer l'école
        </Link>
      )}
      
      {/* Show staff management for admin, director, and secretary roles */}
      {(isAdmin || isDirector || isSecretary) && user && (
        <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Gérer le personnel
        </Link>
      )}
      
      {/* Show student management for admin, director, and teachers */}
      {(isAdmin || isDirector || isTeacher) && user && (
        <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Gérer les élèves
        </Link>
      )}
      
      {/* Show online training link for all users */}
      <Link to="/online-training" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        Formation en ligne
      </Link>
      
      {/* Show curriculum link for teachers, directors and admins */}
      {(isAdmin || isDirector || isTeacher) && user && (
        <Link to="/curriculum" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Programme d'études et évaluation
        </Link>
      )}
      
      {/* Show parent portal only for parents and admins */}
      {(isParent || isAdmin) && user && (
        <Link to="/parent-portal" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Portail parents
        </Link>
      )}
      
      {/* Show student portal only for students and admins */}
      {(isStudent || isAdmin) && user && (
        <Link to="/student-portal" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Portail élèves
        </Link>
      )}
      
      {/* User menu button for desktop */}
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
