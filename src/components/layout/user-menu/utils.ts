
import { UserProfile } from "@/types/auth";
import { User } from "@supabase/supabase-js";

/**
 * Gets user initials for avatar fallback
 */
export const getUserInitials = (userProfile: UserProfile | null, user: User | null): string => {
  if (userProfile?.first_name && userProfile?.last_name) {
    return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
  } else if (user?.email) {
    return user.email.substring(0, 2).toUpperCase();
  } else {
    return "TE"; // Default for Teranga Edu
  }
};

/**
 * Gets role-specific display name
 */
export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'admin': return 'Administrateur';
    case 'teacher': return 'Enseignant';
    case 'director': return 'Directeur';
    case 'secretary': return 'Secrétaire';
    case 'parent': return 'Parent';
    case 'student': return 'Élève';
    case 'inspector': return 'Inspecteur';
    case 'school_life': return 'Vie Scolaire';
    default: return role;
  }
};
