
import { Link } from "react-router-dom";
import { UserProfile } from "@/types/auth";
import { User } from "@supabase/supabase-js";

interface MobileAuthMenuProps {
  isAdmin: boolean;
  isTeacher: boolean;
  isDirector: boolean;
  isSecretary: boolean;
  isParent: boolean;
  isStudent: boolean;
  isInspector: boolean;
  isSchoolLife: boolean;
  onItemClick: () => void;
  user: User | null;
}

const MobileAuthMenu = ({ 
  isAdmin, 
  isTeacher, 
  isDirector, 
  isSecretary, 
  isParent, 
  isStudent, 
  isInspector, 
  isSchoolLife,
  onItemClick,
  user
}: MobileAuthMenuProps) => {
  if (!user) return null;
  
  return (
    <>
      <Link to="/" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
        Accueil
      </Link>
      
      <Link to="/about" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
        À propos
      </Link>
      
      {/* Menu administrateur */}
      {isAdmin && (
        <>
          <Link to="/admin/users" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gestion des utilisateurs
          </Link>
          <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Tableau de bord admin
          </Link>
          <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer les écoles
          </Link>
          <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer le personnel
          </Link>
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer les élèves
          </Link>
        </>
      )}
      
      {/* Menu directeur */}
      {isDirector && !isAdmin && (
        <>
          <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Tableau de bord directeur
          </Link>
          <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer l'école
          </Link>
          <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer le personnel
          </Link>
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Gérer les élèves
          </Link>
        </>
      )}
      
      {/* Menu secrétaire */}
      {isSecretary && !isAdmin && !isDirector && (
        <>
          <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Administration
          </Link>
          <Link to="/staff-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Personnel
          </Link>
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Inscriptions
          </Link>
        </>
      )}
      
      {/* Menu enseignant */}
      {isTeacher && !isAdmin && !isDirector && !isSecretary && (
        <>
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Classes & Élèves
          </Link>
          <Link to="/curriculum" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Programme d'études
          </Link>
        </>
      )}
      
      {/* Menu inspecteur */}
      {isInspector && !isAdmin && (
        <>
          <Link to="/director-dashboard" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Tableau de bord
          </Link>
          <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Supervision des écoles
          </Link>
        </>
      )}
      
      {/* Menu vie scolaire */}
      {isSchoolLife && !isAdmin && (
        <>
          <Link to="/student-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Suivi des élèves
          </Link>
          <Link to="/school-management" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
            Activités scolaires
          </Link>
        </>
      )}
      
      {/* Menu parent */}
      {isParent && !isAdmin && (
        <Link to="/parent-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
          Espace parent
        </Link>
      )}
      
      {/* Menu élève */}
      {isStudent && !isAdmin && (
        <Link to="/student-portal" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
          Espace élève
        </Link>
      )}
      
      {/* Formation en ligne - accessible à tous les utilisateurs connectés */}
      <Link to="/online-training" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
        Formation en ligne
      </Link>
    </>
  );
};

export default MobileAuthMenu;
