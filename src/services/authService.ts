
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, UserRole } from "@/types/auth";

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log("Fetching user profile for:", userId);
    
    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return null;
    }

    // Fetch role from user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (roleError) {
      console.error("Error fetching user role:", roleError);
      return null;
    }

    if (profileData && roleData) {
      const userProfile = {
        ...profileData,
        role: roleData.role as UserRole
      };
      console.log("User profile retrieved:", userProfile);
      return userProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Unexpected error fetching user profile:", error);
    return null;
  }
};

export const createUserProfile = async (
  userId: string, 
  email: string, 
  role: UserRole = "teacher",
  firstName?: string,
  lastName?: string
): Promise<UserProfile | null> => {
  try {
    console.log(`Creating new user profile for: ${userId} with role: ${role}`);
    
    // Check if profile already exists
    const existingProfile = await fetchUserProfile(userId);
    if (existingProfile) {
      console.log("User profile already exists:", existingProfile);
      return existingProfile;
    }

    // The trigger handle_new_user() should have created both profile and role
    // But if not, we'll fetch what exists
    console.log("Profile not found, it should have been created by trigger");
    return null;
  } catch (error) {
    console.error("Unexpected error creating user profile:", error);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  console.log("Executing sign out operation");
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    
    console.log("Sign out successful at service level");
  } catch (error) {
    console.error("Critical error during sign out:", error);
    throw error;
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  console.log("Attempting to sign in with email:", email);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }
    
    console.log("Sign in successful:", data);
    return data;
  } catch (error) {
    console.error("Complete error during sign in:", error);
    throw error;
  }
};

export const signUpWithEmailPassword = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string,
  role: UserRole = "teacher"
) => {
  console.log("Attempting to sign up with email:", email);
  
  try {
    // Force admin role for specific email
    const actualRole = email === "dagueye82@gmail.com" ? "admin" : role;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: actualRole
        },
      },
    });

    if (error) {
      console.error("Sign up error:", error);
      throw error;
    }
    
    console.log("Sign up successful:", data);
    
    // Create user profile immediately after signup
    if (data.user) {
      await createUserProfile(data.user.id, email, actualRole, firstName, lastName);
    }
    
    return data;
  } catch (error) {
    console.error("Complete error during sign up:", error);
    throw error;
  }
};
