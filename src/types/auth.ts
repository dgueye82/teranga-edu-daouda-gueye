
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "teacher" | "student" | "parent";

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
  createUserProfileIfMissing: () => Promise<void>;
}
