
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, UserRole } from "@/types/auth";

// Cache for user profiles to reduce database calls
const profileCache: { [key: string]: UserProfile } = {};

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Check if profile is in cache
    if (profileCache[userId]) {
      console.log("Profil récupéré du cache pour:", userId);
      return profileCache[userId];
    }
    
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

    if (data) {
      console.log("Profil utilisateur récupéré:", data);
      // Store in cache
      profileCache[userId] = data as UserProfile;
      return data as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Erreur inattendue lors de la récupération du profil utilisateur:", error);
    return null;
  }
};

export const createUserProfile = async (
  userId: string, 
  email: string, 
  role: UserRole = "teacher"
): Promise<UserProfile | null> => {
  try {
    console.log(`Création d'un nouveau profil utilisateur pour: ${userId} avec le rôle: ${role}`);
    
    // Force dagueye82@gmail.com to be admin
    const assignedRole = email === "dagueye82@gmail.com" ? "admin" : role;
    
    // Vérifier si un profil existe déjà pour éviter les doublons
    const existingProfile = await fetchUserProfile(userId);
    if (existingProfile) {
      console.log("Profil utilisateur existant, pas de création nécessaire:", existingProfile);
      
      // If the user should be admin but isn't, update the role
      if (email === "dagueye82@gmail.com" && existingProfile.role !== "admin") {
        console.log("Mise à jour du rôle pour dagueye82@gmail.com vers admin");
        const { data, error } = await supabase
          .from("user_profiles")
          .update({ role: "admin" })
          .eq("id", userId)
          .select()
          .single();
        
        if (error) {
          console.error("Erreur lors de la mise à jour du rôle:", error);
          return existingProfile;
        }
        
        // Update cache
        if (data) {
          profileCache[userId] = data as UserProfile;
          return data as UserProfile;
        }
      }
      
      return existingProfile;
    }
    
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        { id: userId, email, role: assignedRole }
      ])
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la création du profil utilisateur:", error);
      return null;
    }

    console.log("Nouveau profil utilisateur créé:", data);
    
    // Update cache
    if (data) {
      profileCache[userId] = data as UserProfile;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error("Erreur inattendue lors de la création du profil utilisateur:", error);
    return null;
  }
};

// Clear cache on sign out
export const signOutUser = async (): Promise<void> => {
  try {
    console.log("Tentative de déconnexion");
    const { error } = await supabase.auth.signOut();
    
    // Clear the profile cache
    Object.keys(profileCache).forEach(key => delete profileCache[key]);
    
    if (error) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
    
    console.log("Déconnexion réussie");
  } catch (error) {
    console.error("Erreur critique lors de la déconnexion:", error);
    throw error;
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  console.log("Tentative de connexion avec email:", email);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
    
    console.log("Connexion réussie:", data);
    return data;
  } catch (error) {
    console.error("Erreur complète lors de la connexion:", error);
    throw error;
  }
};

export const signUpWithEmailPassword = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
  console.log("Tentative d'inscription avec email:", email);
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
    
    console.log("Inscription réussie:", data);
    return data;
  } catch (error) {
    console.error("Erreur complète lors de l'inscription:", error);
    throw error;
  }
};
