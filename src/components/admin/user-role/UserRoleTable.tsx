
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserRoleIcon from "./UserRoleIcon";
import UserRoleSelect from "./UserRoleSelect";
import { UserRole } from "@/types/auth";

type UserWithProfile = {
  id: string;
  email: string;
  role?: UserRole;
  first_name?: string;
  last_name?: string;
  created_at?: string;
};

interface UserRoleTableProps {
  users: UserWithProfile[];
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  impersonateUser: (userId: string) => Promise<void>;
  isLoading?: boolean;
}

const UserRoleTable: React.FC<UserRoleTableProps> = ({
  users,
  updateUserRole,
  impersonateUser,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Rôle actuel</TableHead>
          <TableHead>Changer le rôle</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              Aucun utilisateur trouvé
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.first_name || user.last_name
                  ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                  : "Non spécifié"}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <UserRoleIcon role={user.role} />
                {user.role || "Non défini"}
              </TableCell>
              <TableCell>
                <UserRoleSelect 
                  value={user.role || ""}
                  onValueChange={(value) => updateUserRole(user.id, value)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => impersonateUser(user.id)}
                  disabled={!user.role || user.role === "student" || user.role === "parent"}
                >
                  Impersonifier
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserRoleTable;
