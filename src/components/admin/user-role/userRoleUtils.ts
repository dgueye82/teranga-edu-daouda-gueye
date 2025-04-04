
import { UserRole } from "@/types/auth";

export type UserWithProfile = {
  id: string;
  email: string;
  role?: UserRole;
  first_name?: string;
  last_name?: string;
  created_at?: string;
};

// Filter users based on search term
export const filterUsersBySearch = (users: UserWithProfile[], searchTerm: string): UserWithProfile[] => {
  if (!searchTerm) return users;
  
  return users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Filter users by role
export const filterUsersByRole = (users: UserWithProfile[], role: UserRole | "all"): UserWithProfile[] => {
  if (role === "all") return users;
  return users.filter((user) => user.role === role);
};

