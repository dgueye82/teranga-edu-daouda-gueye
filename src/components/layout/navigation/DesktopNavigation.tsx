
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserMenuButton from "../UserMenuButton";

const DesktopNavigation = () => {
  const { isAdmin, isTeacher, isDirector, isSecretary, isParent, isStudent, isInspector, isSchoolLife, user } = useAuth();

  console.log("Current user roles:", { isAdmin, isTeacher, isDirector, isSecretary, isParent, isStudent, isInspector, isSchoolLife });

  return (
    <nav className="hidden lg:flex items-center space-x-4">
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
        À propos
      </Link>
      
      {/* Menu administrateur */}
      {isAdmin && user && (
        <>
          <Link to="/admin/users" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gestion des utilisateurs
          </Link>
          <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Tableau de bord
          </Link>
          <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer les écoles
          </Link>
          <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer le personnel
          </Link>
          <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer les élèves
          </Link>
        </>
      )}
      
      {/* Menu directeur */}
      {isDirector && !isAdmin && user && (
        <>
          <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Tableau de bord
          </Link>
          <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer l'école
          </Link>
          <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer le personnel
          </Link>
          <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Gérer les élèves
          </Link>
        </>
      )}
      
      {/* Menu secrétaire */}
      {isSecretary && !isAdmin && !isDirector && user && (
        <>
          <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Administration
          </Link>
          <Link to="/staff-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Personnel
          </Link>
          <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Inscriptions
          </Link>
        </>
      )}
      
      {/* Menu enseignant */}
      {isTeacher && !isAdmin && !isDirector && !isSecretary && user && (
        <>
          <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Classes & Élèves
          </Link>
          <Link to="/curriculum" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Programme d'études
          </Link>
        </>
      )}
      
      {/* Menu inspecteur */}
      {isInspector && !isAdmin && user && (
        <>
          <Link to="/director-dashboard" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Tableau de bord
          </Link>
          <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Supervision des écoles
          </Link>
        </>
      )}
      
      {/* Menu vie scolaire */}
      {isSchoolLife && !isAdmin && user && (
        <>
          <Link to="/student-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Suivi des élèves
          </Link>
          <Link to="/school-management" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
            Activités scolaires
          </Link>
        </>
      )}
      
      {/* Menu parent */}
      {isParent && !isAdmin && user && (
        <Link to="/parent-portal" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Espace parent
        </Link>
      )}
      
      {/* Menu élève */}
      {isStudent && !isAdmin && user && (
        <Link to="/student-portal" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Espace élève
        </Link>
      )}
      
      {/* Formation en ligne - accessible à tous les utilisateurs connectés */}
      {user && (
        <Link to="/online-training" className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700">
          Formation en ligne
        </Link>
      )}
      
      {/* User menu button for desktop */}
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
