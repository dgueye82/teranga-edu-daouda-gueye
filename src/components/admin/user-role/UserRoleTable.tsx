
import React from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { UserRole } from "@/types/auth";
import { UserWithProfile } from "./userRoleUtils";
import UserRoleTableHeader from "./UserRoleTableHeader";
import UserRoleTableRow from "./UserRoleTableRow";
import UserRoleEmptyState from "./UserRoleEmptyState";
import UserRoleLoadingState from "./UserRoleLoadingState";

interface UserRoleTableProps {
  users: UserWithProfile[];
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  impersonateUser: (userId: string) => Promise<void>;
  isLoading: boolean;
  currentUserRole?: UserRole;
}

const UserRoleTable: React.FC<UserRoleTableProps> = ({
  users,
  updateUserRole,
  impersonateUser,
  isLoading,
  currentUserRole
}) => {
  // Determine permissions based on user role
  const canEditRoles = currentUserRole === "admin" || currentUserRole === "director";
  const canImpersonate = currentUserRole === "admin";

  if (isLoading) {
    return <UserRoleLoadingState />;
  }

  if (!users.length) {
    return <UserRoleEmptyState />;
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <UserRoleTableHeader />
        <TableBody>
          {users.map((user) => (
            <UserRoleTableRow
              key={user.id}
              user={user}
              updateUserRole={updateUserRole}
              impersonateUser={impersonateUser}
              canEditRoles={canEditRoles}
              canImpersonate={canImpersonate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoleTable;
