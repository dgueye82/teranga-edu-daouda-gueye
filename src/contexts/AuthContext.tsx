
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
        return;
      }

      // First check if profile already exists
      const existingProfile = await fetchUserProfile(user.id);
      
      if (existingProfile) {
        console.log("Existing profile found:", existingProfile);
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
        
        // Force reload to ensure all components get updated
        window.location.reload();
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
      await signOutUser();
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Teranga EDU !",
      });
      
      // Redirect handled in signOutUser
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
      throw error;
    }
  };

  // Helper properties to check user roles
  const isAdmin = userProfile?.role === "admin";
  const isTeacher = userProfile?.role === "teacher";

  console.log("Current auth context state:", { 
    userId: user?.id, 
    email: user?.email,
    isLoading, 
    role: userProfile?.role,
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
