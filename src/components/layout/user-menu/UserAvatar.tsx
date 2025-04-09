
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { getUserInitials } from "./utils";

interface UserAvatarProps {
  userProfile: UserProfile | null;
  user: User | null;
  showName?: boolean;
}

const UserAvatar = ({ userProfile, user, showName = false }: UserAvatarProps) => {
  return (
    <>
      <Avatar className="h-8 w-8 border-2 border-teranga-blue">
        <AvatarFallback className="bg-teranga-blue text-white">
          {getUserInitials(userProfile, user)}
        </AvatarFallback>
      </Avatar>
      
      {showName && (
        <span className="hidden md:inline-block text-sm font-medium">
          {userProfile?.first_name || user?.email?.split('@')[0]}
        </span>
      )}
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
    </>
  );
};

export default UserAvatar;
