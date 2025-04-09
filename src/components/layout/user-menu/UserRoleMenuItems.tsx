
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface UserRoleMenuItemsProps {
  isAdmin: boolean;
  isTeacher: boolean;
  isDirector: boolean;
  isSecretary: boolean;
  isParent: boolean;
  isStudent: boolean;
  isInspector: boolean;
  isSchoolLife: boolean;
  onItemClick?: () => void;
}

const UserRoleMenuItems = ({ 
  isAdmin, 
  isTeacher, 
  isDirector, 
  isSecretary, 
  isParent, 
  isStudent, 
  isInspector, 
  isSchoolLife,
  onItemClick = () => {} 
}: UserRoleMenuItemsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onItemClick();
  };

  // Menu administrateur
  if (isAdmin) {
    return (
      <>
        <DropdownMenuItem onClick={() => handleNavigate('/admin/users')} className="cursor-pointer">
          Gestion des utilisateurs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/director-dashboard')} className="cursor-pointer">
          Tableau de bord
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/school-management')} className="cursor-pointer">
          Gérer les écoles
        </DropdownMenuItem>
      </>
    );
  }

  // Menu directeur
  if (isDirector) {
    return (
      <>
        <DropdownMenuItem onClick={() => handleNavigate('/director-dashboard')} className="cursor-pointer">
          Tableau de bord directeur
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/school-management')} className="cursor-pointer">
          Gérer l'école
        </DropdownMenuItem>
      </>
    );
  }

  // Menu secrétaire
  if (isSecretary) {
    return (
      <>
        <DropdownMenuItem onClick={() => handleNavigate('/school-management')} className="cursor-pointer">
          Administration
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/student-management')} className="cursor-pointer">
          Inscriptions
        </DropdownMenuItem>
      </>
    );
  }

  // Menu enseignant
  if (isTeacher) {
    return (
      <>
        <DropdownMenuItem onClick={() => handleNavigate('/student-management')} className="cursor-pointer">
          Classes & Élèves
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/curriculum')} className="cursor-pointer">
          Programme d'études
        </DropdownMenuItem>
      </>
    );
  }

  // Menu inspecteur
  if (isInspector) {
    return (
      <>
        <DropdownMenuItem onClick={() => handleNavigate('/director-dashboard')} className="cursor-pointer">
          Tableau de bord
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/school-management')} className="cursor-pointer">
          Supervision des écoles
        </DropdownMenuItem>
      </>
    );
  }

  // Menu vie scolaire
  if (isSchoolLife) {
    return (
      <DropdownMenuItem onClick={() => handleNavigate('/student-management')} className="cursor-pointer">
        Suivi des élèves
      </DropdownMenuItem>
    );
  }

  // Menu parent
  if (isParent) {
    return (
      <DropdownMenuItem onClick={() => handleNavigate('/parent-portal')} className="cursor-pointer">
        Espace parent
      </DropdownMenuItem>
    );
  }

  // Menu élève
  if (isStudent) {
    return (
      <DropdownMenuItem onClick={() => handleNavigate('/student-portal')} className="cursor-pointer">
        Espace élève
      </DropdownMenuItem>
    );
  }

  return null;
};

export default UserRoleMenuItems;
