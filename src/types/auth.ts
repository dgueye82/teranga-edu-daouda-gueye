
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "director" | "secretary" | "teacher" | "parent" | "student" | "inspector" | "school_life";

export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isTeacher: boolean;
  isDirector: boolean;
  isSecretary: boolean;
  isParent: boolean;
  isStudent: boolean;
  isInspector: boolean;
  isSchoolLife: boolean;
  createUserProfileIfMissing: () => Promise<void>;
}
