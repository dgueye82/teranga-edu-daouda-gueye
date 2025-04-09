
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import MobileUserInfo from "./mobile/MobileUserInfo";
import MobileAuthMenu from "./mobile/MobileAuthMenu";
import MobileUnauthMenu from "./mobile/MobileUnauthMenu";
import MobileSignOut from "./mobile/MobileSignOut";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { 
    user, 
    signOut, 
    isAdmin, 
    userProfile, 
    isTeacher, 
    isDirector, 
    isParent, 
    isStudent, 
    isSecretary, 
    isInspector, 
    isSchoolLife 
  } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Log user role information for debugging
  console.log("MobileMenu - User roles:", { 
    isAdmin, 
    isTeacher, 
    isDirector, 
    isSecretary, 
    isParent, 
    isStudent, 
    isInspector, 
    isSchoolLife,
    userProfile: userProfile?.role
  });

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
        type="button"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6 overflow-y-auto">
        {user && <MobileUserInfo userProfile={userProfile} user={user} />}
        
        {user ? (
          <>
            <MobileAuthMenu 
              isAdmin={isAdmin}
              isTeacher={isTeacher}
              isDirector={isDirector}
              isSecretary={isSecretary}
              isParent={isParent}
              isStudent={isStudent}
              isInspector={isInspector}
              isSchoolLife={isSchoolLife}
              onItemClick={onClose}
              user={user}
            />
            <MobileSignOut onSignOut={handleSignOut} />
          </>
        ) : (
          <MobileUnauthMenu onItemClick={onClose} />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
