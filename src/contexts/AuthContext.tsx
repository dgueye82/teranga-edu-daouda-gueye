
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { UserProfile } from "@/types/auth";
import { signOutUser } from "@/services/authService";
import { useAuthState } from "@/hooks/useAuthState";
import { useQueryClient } from "@tanstack/react-query";
import { createUserProfile } from "@/services/authService";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  signOut: () => Promise<void>;
  createUserProfileIfMissing: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  userProfile: null,
  isLoading: true,
  isAdmin: false,
  isTeacher: false,
  signOut: async () => {},
  createUserProfileIfMissing: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { user, session, userProfile, isLoading, setUser, setUserProfile, setSession } = useAuthState();

  // Check if the user has admin role
  const isAdmin = userProfile?.role === "admin";
  
  // Check if the user has teacher role
  const isTeacher = userProfile?.role === "teacher";

  const handleSignOut = async () => {
    try {
      await signOutUser();
      
      // Reset query cache on logout
      queryClient.clear();
      
      // Reset local state
      setUser(null);
      setUserProfile(null);
      setSession(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  // Function to create a user profile if it doesn't exist
  const createUserProfileIfMissing = async () => {
    try {
      if (!user) {
        console.error("Cannot create profile: No authenticated user");
        return;
      }
      
      console.log("Attempting to create user profile if missing for:", user.email);
      
      // If user already has a profile, no need to create one
      if (userProfile) {
        console.log("User profile already exists:", userProfile);
        return;
      }
      
      // Create a new profile
      const newProfile = await createUserProfile(user.id, user.email || "", "teacher");
      
      if (newProfile) {
        console.log("New user profile created:", newProfile);
        setUserProfile(newProfile);
        
        // Invalidate queries that might depend on the user profile
        queryClient.invalidateQueries();
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  // Force invalidation of queries when auth state changes
  useEffect(() => {
    if (user) {
      console.log("Auth state updated, user is logged in:", user.email);
      // Invalidate all queries when auth state changes
      queryClient.invalidateQueries();
    } else {
      console.log("Auth state updated, user is logged out");
      // Clear query cache when user is logged out
      queryClient.clear();
    }
  }, [user, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userProfile,
        isLoading,
        isAdmin,
        isTeacher,
        signOut: handleSignOut,
        createUserProfileIfMissing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
