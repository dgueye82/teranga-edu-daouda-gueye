
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/auth";
import { fetchUserProfile } from "@/services/authService";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const profileFetchInProgress = useRef<{[key: string]: boolean}>({});

  // Fonction pour récupérer le profil utilisateur avec cache et verrouillage
  const getProfileForUser = async (userId: string) => {
    try {
      // Si un fetch est déjà en cours pour cet utilisateur, ne pas démarrer un autre
      if (profileFetchInProgress.current[userId]) {
        console.log("Fetch de profil déjà en cours pour:", userId);
        return;
      }

      // Marquer que le fetch est en cours
      profileFetchInProgress.current[userId] = true;

      console.log("Récupération du profil utilisateur pour:", userId);
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        console.log("Profil récupéré:", profile);
        setUserProfile(profile);
      } else {
        console.log("Aucun profil trouvé pour:", userId);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    } finally {
      // Libérer le verrou
      profileFetchInProgress.current[userId] = false;
    }
  };

  useEffect(() => {
    let mounted = true;
    
    // Vérifier s'il y a une session existante
    const getInitialSession = async () => {
      try {
        console.log("Récupération de la session initiale...");
        
        const { data } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (data.session) {
          console.log("Session initiale trouvée");
          setSession(data.session);
          setUser(data.session.user);
          
          if (data.session.user) {
            await getProfileForUser(data.session.user.id);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Configurer le listener d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Changement d'état d'authentification:", event, newSession?.user?.id);
        
        if (!mounted) return;
        
        setSession(newSession);
        
        if (newSession?.user) {
          console.log("Utilisateur authentifié:", newSession.user.email);
          setUser(newSession.user);
          
          // Récupérer le profil pour l'utilisateur
          await getProfileForUser(newSession.user.id);
        } else {
          console.log("Utilisateur déconnecté");
          setUser(null);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Initialiser la session dès le début
    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, userProfile, isLoading, setUser, setUserProfile, setSession };
};
