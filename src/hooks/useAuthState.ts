
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/auth";
import { fetchUserProfile } from "@/services/authService";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return { user, session, userProfile, isLoading, setUser, setUserProfile, setSession };
};
