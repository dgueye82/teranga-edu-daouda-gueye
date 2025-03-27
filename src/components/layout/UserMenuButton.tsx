
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

interface UserMenuButtonProps {
  user?: User | null;
  signOut?: () => Promise<void>;
}

const UserMenuButton = ({ user, signOut }: UserMenuButtonProps = {}) => {
  return (
    <Button
      variant="ghost"
      className="h-10 w-10 rounded-full"
      aria-label="User menu"
      onClick={signOut}
    >
      <UserIcon className="h-5 w-5" />
    </Button>
  );
};

export default UserMenuButton;
