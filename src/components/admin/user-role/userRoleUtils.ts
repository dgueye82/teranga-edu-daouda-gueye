
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

// This function returns users that are relevant based on the current user's role
export const filterUsersByUserAccess = (users: UserWithProfile[], currentUserRole?: UserRole): UserWithProfile[] => {
  if (!currentUserRole) return [];
  
  // Admin can see everyone
  if (currentUserRole === "admin") return users;
  
  // Director can see teachers, secretaries, students, and parents
  if (currentUserRole === "director") {
    return users.filter(user => 
      user.role === "teacher" || 
      user.role === "secretary" || 
      user.role === "student" || 
      user.role === "parent" ||
      user.role === "school_life" ||
      user.id === currentUserRole // Directors can see their own profile
    );
  }
  
  // Teachers can see students and parents
  if (currentUserRole === "teacher") {
    return users.filter(user => 
      user.role === "student" || 
      user.role === "parent" ||
      user.id === currentUserRole // Teachers can see their own profile
    );
  }
  
  // Secretary can see students and parents
  if (currentUserRole === "secretary") {
    return users.filter(user => 
      user.role === "student" || 
      user.role === "parent" ||
      user.id === currentUserRole // Secretaries can see their own profile
    );
  }
  
  // Parents can only see themselves and their children (students)
  if (currentUserRole === "parent") {
    // Note: In a real implementation, you'd need to check for parent-student relationships
    // This is a simplified version for demonstration
    return users.filter(user => 
      user.id === currentUserRole // Parents can only see their own profile
    );
  }
  
  // Students can only see themselves
  if (currentUserRole === "student") {
    return users.filter(user => 
      user.id === currentUserRole // Students can only see their own profile
    );
  }
  
  // Inspector can see directors, teachers and school data
  if (currentUserRole === "inspector") {
    return users.filter(user => 
      user.role === "director" || 
      user.role === "teacher" ||
      user.id === currentUserRole // Inspectors can see their own profile
    );
  }
  
  // School life personnel can see students and parents
  if (currentUserRole === "school_life") {
    return users.filter(user => 
      user.role === "student" || 
      user.role === "parent" ||
      user.id === currentUserRole // School life can see their own profile
    );
  }
  
  // Default case - users can only see themselves
  return users.filter(user => user.id === currentUserRole);
};
