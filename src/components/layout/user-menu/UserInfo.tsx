
import { UserProfile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { getRoleDisplayName } from "./utils";

interface UserInfoProps {
  userProfile: UserProfile | null;
  user: User | null;
}

const UserInfo = ({ userProfile, user }: UserInfoProps) => {
  if (!user) return null;

  return (
    <div className="px-4 py-3 text-sm font-medium text-teranga-blue">
      <div className="font-bold">
        {userProfile?.first_name} {userProfile?.last_name || user.email?.split('@')[0]}
      </div>
      <div className="text-xs text-gray-500 mt-1">{user.email}</div>
      {userProfile?.role && (
        <span className="block text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full w-fit">
          {getRoleDisplayName(userProfile.role)}
        </span>
      )}
    </div>
  );
};

export default UserInfo;
