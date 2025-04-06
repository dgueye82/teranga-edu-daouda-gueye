
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserRoleFilters from "./user-role/UserRoleFilters";
import UserRoleSearchBar from "./user-role/UserRoleSearchBar";
import UserRoleContent from "./user-role/UserRoleContent";
import UserRoleFooter from "./user-role/UserRoleFooter";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "./user-role/hooks/useUserData";
import { useUserActions } from "./user-role/hooks/useUserActions";
import { useUserFilters } from "./user-role/hooks/useUserFilters";

const UserRoleManagement = () => {
  const { userProfile } = useAuth();
  const { users, isLoading, fetchUsers, setUsers } = useUserData(userProfile);
  const { updateUserRole, impersonateUser } = useUserActions(setUsers, userProfile?.role);
  const { 
    searchTerm, 
    setSearchTerm, 
    activeTab, 
    setActiveTab,
    filteredUsers,
    getFilteredUsersByRole 
  } = useUserFilters(users);

  // Fetch users on component mount and when userProfile changes
  useEffect(() => {
    fetchUsers();
  }, [userProfile]);

  // Determine which tabs to show based on user role
  const showAllTabs = userProfile?.role === "admin" || userProfile?.role === "director";
  const showTeacherTab = showAllTabs || ["admin", "director", "inspector"].includes(userProfile?.role);
  const showStudentTab = showAllTabs || ["admin", "director", "teacher", "secretary", "school_life"].includes(userProfile?.role);
  const showParentTab = showAllTabs || ["admin", "director", "teacher", "secretary", "school_life"].includes(userProfile?.role);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Rôles Utilisateurs</CardTitle>
        <CardDescription>
          {userProfile?.role === "admin" ? 
            "Attribuez des rôles aux utilisateurs et impersonifiez des comptes." :
            "Consultez les utilisateurs selon vos permissions."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserRoleSearchBar
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />

        <UserRoleFilters 
          activeTab={activeTab} 
          onChange={setActiveTab}
          showAllTabs={showAllTabs}
          showTeacherTab={showTeacherTab}
          showStudentTab={showStudentTab}
          showParentTab={showParentTab}
        />

        <UserRoleContent
          getFilteredUsersByRole={getFilteredUsersByRole}
          updateUserRole={updateUserRole}
          impersonateUser={impersonateUser}
          isLoading={isLoading}
          currentUserRole={userProfile?.role}
        />
      </CardContent>
      <UserRoleFooter 
        userCount={filteredUsers.length} 
        onRefresh={fetchUsers} 
      />
    </Card>
  );
};

export default UserRoleManagement;
