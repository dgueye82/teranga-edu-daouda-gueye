
import { createContext, useContext } from "react";
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

  const createUserProfileIfMissing = async () => {
    if (!user) {
      console.log("Aucun utilisateur authentifié, impossible de créer un profil");
      return;
    }
    
    if (userProfile) {
      console.log("L'utilisateur a déjà un profil");
      return;
    }

    // Vérifier si le profil existe déjà
    const profile = await fetchUserProfile(user.id);
    
    if (profile) {
      setUserProfile(profile);
      console.log("Profil existant récupéré:", profile);
      return;
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
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer votre profil utilisateur. Veuillez contacter l'administrateur.",
      });
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      
      // La mise à jour de l'état est gérée par le listener onAuthStateChange
      // dans useAuthState.ts
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Teranga EDU !",
      });
      
      // Force le rechargement de la page pour effacer complètement l'état
      window.location.href = "/";
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
      createUserProfileIfMissing
    }}>
      {children}
    </AuthContext.Provider>
  );
};
