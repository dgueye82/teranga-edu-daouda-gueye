
import { createContext, useContext, useCallback, useEffect } from "react";
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

  // Check and create profile for admin user if needed
  useEffect(() => {
    const ensureAdminProfile = async () => {
      if (!user || isLoading || userProfile) return;
      
      if (user.email === "dagueye82@gmail.com") {
        console.log("Vérification du profil admin pour:", user.email);
        const profile = await fetchUserProfile(user.id);
        
        if (!profile) {
          console.log("Création du profil admin pour:", user.email);
          const newProfile = await createUserProfile(user.id, user.email, "admin");
          if (newProfile) {
            setUserProfile(newProfile);
          }
        } else if (profile.role !== "admin") {
          console.log("Mise à jour du profil vers admin pour:", user.email);
          const updatedProfile = await createUserProfile(user.id, user.email, "admin");
          if (updatedProfile) {
            setUserProfile(updatedProfile);
          }
        } else {
          setUserProfile(profile);
        }
      }
    };
    
    ensureAdminProfile();
  }, [user, isLoading, userProfile, setUserProfile]);

  const createUserProfileIfMissing = useCallback(async () => {
    if (!user) {
      console.log("Aucun utilisateur authentifié, impossible de créer un profil");
      return null;
    }
    
    if (userProfile) {
      console.log("L'utilisateur a déjà un profil:", userProfile);
      return userProfile;
    }

    // Vérifier si le profil existe déjà
    const profile = await fetchUserProfile(user.id);
    
    if (profile) {
      console.log("Profil existant récupéré:", profile);
      setUserProfile(profile);
      return profile;
    }

    // Si le profil n'existe pas, le créer avec le rôle admin pour le compte spécifique
    // ou teacher pour les autres comptes
    const defaultRole = user.email === "dagueye82@gmail.com" ? "admin" : "teacher";
    console.log(`Création d'un profil avec le rôle ${defaultRole} pour ${user.email}`);
    
    const newProfile = await createUserProfile(user.id, user.email || "", defaultRole);
    
    if (newProfile) {
      setUserProfile(newProfile);
      toast({
        title: "Profil créé",
        description: "Votre profil utilisateur a été créé avec succès.",
      });
      return newProfile;
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer votre profil utilisateur. Veuillez contacter l'administrateur.",
      });
      return null;
    }
  }, [user, userProfile, setUserProfile, toast]);

  // Wrap the original function to make it void
  const createUserProfileIfMissingWrapper = useCallback(async (): Promise<void> => {
    await createUserProfileIfMissing();
    // Return nothing to match void type
  }, [createUserProfileIfMissing]);

  const signOut = async () => {
    try {
      await signOutUser();
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Teranga EDU !",
      });
      
      // La redirection est gérée dans signOutUser
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
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

  console.log("État actuel du contexte d'authentification:", { 
    user: user?.id, 
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
      createUserProfileIfMissing: createUserProfileIfMissingWrapper
    }}>
      {children}
    </AuthContext.Provider>
  );
};
