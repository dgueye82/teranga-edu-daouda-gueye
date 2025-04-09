
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface MobileSignOutProps {
  onSignOut: () => Promise<void>;
}

const MobileSignOut = ({ onSignOut }: MobileSignOutProps) => {
  return (
    <div className="pt-4 mt-auto">
      <Button 
        variant="outline" 
        onClick={onSignOut} 
        className="w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );
};

export default MobileSignOut;
