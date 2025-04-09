
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import UserInfo from "./UserInfo";
import UserRoleMenuItems from "./UserRoleMenuItems";

interface AuthenticatedMenuProps {
  align?: "start" | "end" | "center";
  onMenuClose?: () => void;
}

const AuthenticatedMenu = ({ align = "end", onMenuClose = () => {} }: AuthenticatedMenuProps) => {
  const { 
    user, 
    userProfile, 
    isAdmin,
    isTeacher,
    isDirector,
    isSecretary,
    isParent,
    isStudent,
    isInspector,
    isSchoolLife,
    signOut 
  } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenuContent align={align} className="w-64">
      <UserInfo userProfile={userProfile} user={user} />
      <DropdownMenuSeparator />

      {/* Role-specific menu items */}
      <UserRoleMenuItems 
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        isDirector={isDirector}
        isSecretary={isSecretary}
        isParent={isParent}
        isStudent={isStudent}
        isInspector={isInspector}
        isSchoolLife={isSchoolLife}
        onItemClick={onMenuClose}
      />

      <DropdownMenuSeparator />
      
      {/* Logout option for all users */}
      <DropdownMenuItem 
        onClick={signOut} 
        className="text-red-500 cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default AuthenticatedMenu;
