
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenuButton = () => {
  const { user, userProfile, signOut } = useAuth();
  
  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Connexion
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-4 py-2 rounded-full flex items-center gap-2 border border-gray-200 hover:bg-gray-100"
          aria-label="Menu utilisateur"
        >
          <div className="h-6 w-6 rounded-full bg-teranga-blue flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {userProfile?.first_name?.[0] || userProfile?.email?.[0] || user.email?.[0] || "U"}
            </span>
          </div>
          <span className="hidden md:inline text-sm font-medium">
            {userProfile?.first_name || userProfile?.email || user.email || "Utilisateur"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
