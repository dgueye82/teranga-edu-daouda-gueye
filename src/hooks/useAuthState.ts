
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
  
  // Function to fetch user profile
  const getProfileForUser = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        console.log("Profile retrieved:", profile);
        setUserProfile(profile);
      } else {
        console.log("No profile found for:", userId);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    // Set up the auth state listener first to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state change:", event, newSession?.user?.id);
        
        if (!mounted) return;
        
        // Always update session first
        setSession(newSession);
        
        if (newSession?.user) {
          console.log("User authenticated:", newSession.user.email);
          setUser(newSession.user);
          
          // Get profile for user
          await getProfileForUser(newSession.user.id);
        } else {
          console.log("User signed out");
          setUser(null);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    const getInitialSession = async () => {
      try {
        console.log("Getting initial session...");
        
        const { data } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (data.session) {
          console.log("Initial session found");
          setSession(data.session);
          setUser(data.session.user);
          
          if (data.session.user) {
            await getProfileForUser(data.session.user.id);
          }
        } else {
          console.log("No initial session found");
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, userProfile, isLoading, setUser, setUserProfile, setSession };
};
