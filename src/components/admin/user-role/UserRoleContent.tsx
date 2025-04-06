
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import UserRoleTable from "./UserRoleTable";
import { UserRole } from "@/types/auth";
import { UserWithProfile } from "./userRoleUtils";

interface UserRoleContentProps {
  getFilteredUsersByRole: (role: UserRole | "all") => UserWithProfile[];
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  impersonateUser: (userId: string) => Promise<void>;
  isLoading: boolean;
  currentUserRole?: UserRole;
}

const UserRoleContent: React.FC<UserRoleContentProps> = ({
  getFilteredUsersByRole,
  updateUserRole,
  impersonateUser,
  isLoading,
  currentUserRole
}) => {
  const renderTabContent = (role: UserRole | "all") => (
    <UserRoleTable 
      users={getFilteredUsersByRole(role)} 
      updateUserRole={updateUserRole}
      impersonateUser={impersonateUser}
      isLoading={isLoading}
      currentUserRole={currentUserRole}
    />
  );

  return (
    <>
      <TabsContent value="all">{renderTabContent("all")}</TabsContent>
      <TabsContent value="admin">{renderTabContent("admin")}</TabsContent>
      <TabsContent value="director">{renderTabContent("director")}</TabsContent>
      <TabsContent value="secretary">{renderTabContent("secretary")}</TabsContent>
      <TabsContent value="teacher">{renderTabContent("teacher")}</TabsContent>
      <TabsContent value="parent">{renderTabContent("parent")}</TabsContent>
      <TabsContent value="student">{renderTabContent("student")}</TabsContent>
      <TabsContent value="inspector">{renderTabContent("inspector")}</TabsContent>
      <TabsContent value="school_life">{renderTabContent("school_life")}</TabsContent>
    </>
  );
};

export default UserRoleContent;
