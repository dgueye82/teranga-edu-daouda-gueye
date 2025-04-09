
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

interface UnauthenticatedMenuProps {
  align?: "start" | "end" | "center";
  onMenuClose?: () => void;
}

const UnauthenticatedMenu = ({ align = "end", onMenuClose = () => {} }: UnauthenticatedMenuProps) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/auth');
    onMenuClose();
  };
  
  return (
    <DropdownMenuContent align={align} className="w-64">
      <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
        <LogIn className="mr-2 h-4 w-4" />
        Connexion
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UnauthenticatedMenu;
