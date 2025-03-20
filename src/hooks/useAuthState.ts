
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

  // Fonction pour récupérer le profil utilisateur
  const getProfileForUser = async (userId: string) => {
    try {
      const profile = await fetchUserProfile(userId);
      console.log("Profil récupéré:", profile);
      setUserProfile(profile);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    // Configurer le listener d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Changement d'état d'authentification:", event, newSession?.user?.id);
        
        if (!mounted) return;
        
        setSession(newSession);
        
        if (newSession?.user) {
          console.log("Utilisateur authentifié:", newSession.user);
          setUser(newSession.user);
          
          // Récupérer le profil uniquement si l'utilisateur est nouveau ou a changé
          if (!userProfile || userProfile.id !== newSession.user.id) {
            await getProfileForUser(newSession.user.id);
          }
        } else {
          console.log("Utilisateur déconnecté");
          setUser(null);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Vérifier s'il y a une session existante
    const getSession = async () => {
      try {
        console.log("Récupération de la session en cours...");
        
        const { data } = await supabase.auth.getSession();
        console.log("Données de session:", data);
        
        if (!mounted) return;
        
        setSession(data.session);
        
        if (data.session?.user) {
          console.log("Utilisateur trouvé dans la session:", data.session.user);
          setUser(data.session.user);
          
          await getProfileForUser(data.session.user.id);
        } else {
          console.log("Aucun utilisateur dans la session");
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, userProfile, isLoading, setUser, setUserProfile, setSession };
};
