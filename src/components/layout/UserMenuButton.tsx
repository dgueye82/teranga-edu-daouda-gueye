
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  // Display first letter of first name or email as fallback
  const initials = userProfile?.first_name 
    ? userProfile.first_name[0].toUpperCase() + (userProfile.last_name?.[0]?.toUpperCase() || '')
    : user.email?.[0]?.toUpperCase() || 'U';
    
  const displayName = 
    userProfile?.first_name && userProfile?.last_name
      ? `${userProfile.first_name} ${userProfile.last_name}` 
      : userProfile?.first_name || user.email || "Utilisateur";

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-4 py-2 rounded-full flex items-center gap-2 border border-gray-200 hover:bg-gray-100"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-teranga-blue text-white text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium">
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-xs text-gray-500">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuButton;
