
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "teacher" | "student" | "parent";

interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  userProfile: null,
  isLoading: true,
  signOut: async () => {},
  isAdmin: false,
  isTeacher: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Récupération du profil utilisateur pour:", userId);
      
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
        return null;
      }

      console.log("Profil utilisateur récupéré:", data);
      return data as UserProfile;
    } catch (error) {
      console.error("Erreur inattendue lors de la récupération du profil utilisateur:", error);
      return null;
    }
  };

  useEffect(() => {
    // Récupérer la session actuelle
    const getSession = async () => {
      try {
        console.log("Récupération de la session en cours...");
        
        const { data } = await supabase.auth.getSession();
        console.log("Données de session:", data);
        
        setSession(data.session);
        
        if (data.session?.user) {
          console.log("Utilisateur trouvé dans la session:", data.session.user);
          setUser(data.session.user);
          
          const profile = await fetchUserProfile(data.session.user.id);
          console.log("Profil récupéré:", profile);
          
          setUserProfile(profile);
        } else {
          console.log("Aucun utilisateur dans la session");
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Changement d'état d'authentification:", event, newSession?.user?.id);
        
        setSession(newSession);
        
        if (newSession?.user) {
          console.log("Nouvel utilisateur authentifié:", newSession.user);
          setUser(newSession.user);
          
          const profile = await fetchUserProfile(newSession.user.id);
          console.log("Nouveau profil récupéré:", profile);
          
          setUserProfile(profile);
        } else {
          console.log("Utilisateur déconnecté");
          setUser(null);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("Tentative de déconnexion");
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setSession(null);
    console.log("Déconnexion réussie");
  };

  // Helper properties to check user roles
  const isAdmin = userProfile?.role === "admin";
  const isTeacher = userProfile?.role === "teacher";

  console.log("État actuel du contexte d'authentification:", { 
    user: user?.id, 
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
      isTeacher
    }}>
      {children}
    </AuthContext.Provider>
  );
};
