
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, UserRole } from "@/types/auth";

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
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

export const createUserProfile = async (
  userId: string, 
  email: string, 
  role: UserRole = "teacher"
): Promise<UserProfile | null> => {
  try {
    console.log(`Création d'un nouveau profil utilisateur pour: ${userId} avec le rôle: ${role}`);
    
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        { id: userId, email, role }
      ])
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la création du profil utilisateur:", error);
      return null;
    }

    console.log("Nouveau profil utilisateur créé:", data);
    return data as UserProfile;
  } catch (error) {
    console.error("Erreur inattendue lors de la création du profil utilisateur:", error);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    console.log("Tentative de déconnexion");
    const { error } = await supabase.auth.signOut();
    
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
