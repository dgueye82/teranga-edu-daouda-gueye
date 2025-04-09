
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface MobileUnauthMenuProps {
  onItemClick: () => void;
}

const MobileUnauthMenu = ({ onItemClick }: MobileUnauthMenuProps) => {
  return (
    <>
      <Link to="/" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
        Accueil
      </Link>
      
      <Link to="/about" className="py-2 text-lg font-medium border-b border-gray-100 text-gray-700" onClick={onItemClick}>
        À propos
      </Link>
      
      <div className="pt-4 mt-auto">
        <Link to="/auth" onClick={onItemClick}>
          <Button variant="default" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Connexion
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MobileUnauthMenu;
