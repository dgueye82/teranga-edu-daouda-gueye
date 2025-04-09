
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, UserRole } from "@/types/auth";

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log("Fetching user profile for:", userId);
    
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    if (data) {
      console.log("User profile retrieved:", data);
      return data as UserProfile;
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
    
    // Assign specific roles to specific email addresses - add your admin email here
    let assignedRole = role;
    if (email === "dagueye82@gmail.com" || email === "admin@example.com") {
      assignedRole = "admin";
      console.log(`Setting admin role for ${email}`);
    } else if (email === "oprudence2000@gmail.com" || email === "teacher@example.com") {
      assignedRole = "teacher";
    } else if (email === "director@example.com") {
      assignedRole = "director";
    } else if (email === "secretary@example.com") {
      assignedRole = "secretary";
    }
    
    // Check if profile already exists
    const existingProfile = await fetchUserProfile(userId);
    if (existingProfile) {
      console.log("User profile already exists:", existingProfile);
      
      // If it's one of the specific emails and the role is not correct, update it
      if ((email === "dagueye82@gmail.com" && existingProfile.role !== "admin") || 
          (email === "oprudence2000@gmail.com" && existingProfile.role !== "teacher")) {
        console.log(`Updating role for ${email} to ${assignedRole}`);
        const { data, error } = await supabase
          .from("user_profiles")
          .update({ role: assignedRole })
          .eq("id", userId)
          .select()
          .single();
        
        if (error) {
          console.error("Error updating role:", error);
          return existingProfile;
        }
        
        if (data) {
          console.log("Profile updated with correct role:", data);
          return data as UserProfile;
        }
      }
      
      return existingProfile;
    }
    
    // Try to get name from user metadata if not provided
    if (!firstName || !lastName) {
      const { data: userData } = await supabase.auth.getUser(userId);
      if (userData?.user?.user_metadata) {
        firstName = firstName || userData.user.user_metadata.first_name;
        lastName = lastName || userData.user.user_metadata.last_name;
      }
    }
    
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        { 
          id: userId, 
          email, 
          role: assignedRole,
          first_name: firstName,
          last_name: lastName
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error);
      return null;
    }

    console.log("New user profile created:", data);
    return data as UserProfile;
  } catch (error) {
    console.error("Unexpected error creating user profile:", error);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    console.log("Attempting to sign out");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    
    console.log("Sign out successful");
    
    // Rediriger vers la page d'accueil après déconnexion
    window.location.href = "/";
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
