
import { useState } from "react";
import { UserWithProfile, filterUsersBySearch, filterUsersByRole } from "../userRoleUtils";
import { UserRole } from "@/types/auth";

export const useUserFilters = (users: UserWithProfile[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter users based on search term and active tab
  const filteredUsers = filterUsersBySearch(users, searchTerm);
  const getFilteredUsersByRole = (role: UserRole | "all") => filterUsersByRole(filteredUsers, role);

  return { 
    searchTerm, 
    setSearchTerm, 
    activeTab, 
    setActiveTab, 
    filteredUsers,
    getFilteredUsersByRole
  };
};
