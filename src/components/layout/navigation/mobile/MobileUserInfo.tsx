
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { getUserInitials, getRoleDisplayName } from "../../user-menu/utils";

interface MobileUserInfoProps {
  userProfile: UserProfile | null;
  user: User | null;
}

const MobileUserInfo = ({ userProfile, user }: MobileUserInfoProps) => {
  if (!user) return null;

  return (
    <div className="py-4 px-4 mb-2 bg-gray-50 rounded-lg flex items-start gap-3">
      <Avatar className="h-10 w-10 border-2 border-teranga-blue">
        <AvatarFallback className="bg-teranga-blue text-white">
          {getUserInitials(userProfile, user)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold text-teranga-blue">
          {userProfile?.first_name} {userProfile?.last_name || user.email?.split('@')[0]}
        </p>
        <p className="text-sm text-gray-500">{user.email}</p>
        {userProfile?.role && (
          <span className="inline-block text-xs mt-1 bg-gray-200 px-2 py-0.5 rounded-full">
            {getRoleDisplayName(userProfile.role)}
          </span>
        )}
      </div>
    </div>
  );
};

export default MobileUserInfo;
