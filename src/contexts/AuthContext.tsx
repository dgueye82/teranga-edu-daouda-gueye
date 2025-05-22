
import { createContext, useContext, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/hooks/useAuthState";
import { createUserProfile, fetchUserProfile, signOutUser } from "@/services/authService";
import type { AuthContextProps } from "@/types/auth";

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  userProfile: null,
  isLoading: true,
  signOut: async () => {},
  isAdmin: false,
  isTeacher: false,
  createUserProfileIfMissing: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, session, userProfile, isLoading, setUserProfile } = useAuthState();
  const { toast } = useToast();

  const createUserProfileIfMissing = useCallback(async (): Promise<void> => {
    if (!user) {
      console.log("No authenticated user, cannot create profile");
      return;
    }
    
    try {
      if (userProfile) {
        console.log("User already has a profile:", userProfile);
        
        // Special case for admin email - make sure they always have admin role
        if (user.email === "dagueye82@gmail.com" && userProfile.role !== "admin") {
          console.log("Updating dagueye82@gmail.com to admin role");
          const updatedProfile = await createUserProfile(user.id, user.email || "", "admin");
          if (updatedProfile) {
            setUserProfile(updatedProfile);
            toast({
              title: "Rôle mis à jour",
              description: "Votre rôle a été mis à jour en admin.",
            });
          }
        }
        return;
      }

      // First check if profile already exists
      console.log("Checking for existing profile for user:", user.id);
      const existingProfile = await fetchUserProfile(user.id);
      
      if (existingProfile) {
        console.log("Existing profile found:", existingProfile);
        
        // Special case for admin email - make sure they always have admin role
        if (user.email === "dagueye82@gmail.com" && existingProfile.role !== "admin") {
          console.log("Updating dagueye82@gmail.com to admin role");
          const updatedProfile = await createUserProfile(user.id, user.email || "", "admin");
          if (updatedProfile) {
            setUserProfile(updatedProfile);
            toast({
              title: "Rôle mis à jour",
              description: "Votre rôle a été mis à jour en admin.",
            });
            return;
          }
        }
        
        setUserProfile(existingProfile);
        return;
      }

      // Special case for admin email
      const defaultRole = user.email === "dagueye82@gmail.com" ? "admin" : "teacher";
      console.log(`Creating profile with role ${defaultRole} for ${user.email}`);
      
      const newProfile = await createUserProfile(user.id, user.email || "", defaultRole);
      
      if (newProfile) {
        setUserProfile(newProfile);
        toast({
          title: "Profil créé",
          description: "Votre profil utilisateur a été créé avec succès.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de créer votre profil utilisateur.",
        });
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
      toast({
        variant: "destructive",
        title: "Erreur de profil",
        description: "Une erreur est survenue lors de la création de votre profil.",
      });
    }
  }, [user, userProfile, setUserProfile, toast]);

  const signOut = async () => {
    try {
      console.log("Initiating sign out process");
      await signOutUser();
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Teranga EDU !",
      });
      
      // After successful sign out, perform a clean redirect
      // Using window.location instead of navigate to ensure a clean state reset
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  // Helper properties to check user roles - guaranteed to be accurate
  const isAdmin = userProfile?.role === "admin";
  const isTeacher = userProfile?.role === "teacher";

  console.log("Current auth context state:", { 
    userId: user?.id, 
    email: user?.email,
    isLoading, 
    role: userProfile?.role,
    first_name: userProfile?.first_name,
    last_name: userProfile?.last_name,
    isAdmin,
    isTeacher 
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      userProfile,
      isLoading, 
      signOut,
      isAdmin,
      isTeacher,
      createUserProfileIfMissing
    }}>
      {children}
    </AuthContext.Provider>
  );
};
