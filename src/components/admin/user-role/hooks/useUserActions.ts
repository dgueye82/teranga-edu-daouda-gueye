
import { UserWithProfile } from "../userRoleUtils";
import { UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserActions = (setUsers: React.Dispatch<React.SetStateAction<UserWithProfile[]>>, currentUserRole?: UserRole) => {
  const { toast } = useToast();

  // Update a user's role
  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      // Check if current user has permission to update roles
      if (currentUserRole !== "admin" && currentUserRole !== "director") {
        toast({
          variant: "destructive",
          title: "Permission refusée",
          description: "Vous n'avez pas les droits pour modifier les rôles des utilisateurs.",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ role })
        .eq("id", userId)
        .select();

      if (error) throw error;

      // Update the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      );

      toast({
        title: "Rôle mis à jour",
        description: `L'utilisateur a maintenant le rôle ${role}.`,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour du rôle",
        description: error.message,
      });
    }
  };

  // Impersonate a user (log in as them)
  const impersonateUser = async (userId: string) => {
    try {
      // Check if current user has permission to impersonate
      if (currentUserRole !== "admin") {
        toast({
          variant: "destructive",
          title: "Permission refusée",
          description: "Seuls les administrateurs peuvent impersonifier d'autres utilisateurs.",
        });
        return;
      }
      
      // Store the current admin user ID for later restoration
      const sessionResponse = await supabase.auth.getSession();
      
      if (sessionResponse.error) throw sessionResponse.error;
      
      if (sessionResponse.data.session) {
        localStorage.setItem("adminUserId", sessionResponse.data.session.user.id || "");
      }
      
      // For demo purposes, we'll just show a toast and redirect
      toast({
        title: "Impersonification",
        description: "Dans un environnement de production, vous seriez maintenant connecté en tant que cet utilisateur.",
      });
      
      // Redirect based on the impersonated user's role
      const user = await findUserById(userId);
      if (user) {
        redirectUserByRole(user.role);
      }
    } catch (error) {
      console.error("Error impersonating user:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'impersonification",
        description: error.message,
      });
    }
  };

  const findUserById = async (userId: string): Promise<UserWithProfile | undefined> => {
    let foundUser: UserWithProfile | undefined;
    
    setUsers((currentUsers) => {
      foundUser = currentUsers.find(user => user.id === userId);
      return currentUsers;
    });
    
    return foundUser;
  };

  const redirectUserByRole = (role?: UserRole) => {
    if (!role) return;
    
    if (role === "teacher" || role === "director" || role === "secretary") {
      window.location.href = "/staff-dashboard";
    } else if (role === "admin" || role === "inspector") {
      window.location.href = "/director-dashboard";
    } else if (role === "student" || role === "parent" || role === "school_life") {
      window.location.href = "/student-dashboard";
    }
  };

  return { updateUserRole, impersonateUser };
};
