
import { useState } from "react";
import { UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserWithProfile, filterUsersByUserAccess } from "../userRoleUtils";

export const useUserData = (userProfile?: { role: UserRole }) => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all users and their profiles
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*");

      if (profilesError) {
        throw profilesError;
      }

      let userProfiles = profiles.map((profile) => ({
        id: profile.id,
        email: profile.email,
        role: profile.role as UserRole,
        // Ensure required fields have default values if they're null or undefined
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        created_at: profile.created_at || ""
      }));
      
      // Filter users based on current user's role
      if (userProfile) {
        userProfiles = filterUsersByUserAccess(userProfiles, userProfile.role);
      }

      setUsers(userProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la récupération des utilisateurs",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, fetchUsers, setUsers };
};
