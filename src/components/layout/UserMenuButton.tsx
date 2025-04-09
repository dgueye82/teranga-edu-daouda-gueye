
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserAvatar from "./user-menu/UserAvatar";
import AuthenticatedMenu from "./user-menu/AuthenticatedMenu";
import UnauthenticatedMenu from "./user-menu/UnauthenticatedMenu";

const UserMenuButton = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  // Function to display login status toast
  const showLoginStatus = () => {
    if (user) {
      toast({
        title: "Connecté",
        description: `Vous êtes connecté en tant que ${user.email}${userProfile ? ' ('+userProfile.role+')' : ''}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Non connecté",
        description: "Vous n'êtes pas connecté",
        variant: "default"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button
            variant="ghost"
            className="relative flex items-center gap-2 px-2 py-1.5 rounded-full"
            aria-label="Menu utilisateur"
            onClick={() => showLoginStatus()}
          >
            <UserAvatar userProfile={userProfile} user={user} showName={true} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-full"
            aria-label="Menu utilisateur"
          >
            <User className="h-5 w-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      
      {user ? (
        <AuthenticatedMenu />
      ) : (
        <UnauthenticatedMenu />
      )}
    </DropdownMenu>
  );
};

export default UserMenuButton;
