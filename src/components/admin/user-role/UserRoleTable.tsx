
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";
import { UserRole } from "@/types/auth";
import UserRoleIcon from "./UserRoleIcon";
import UserRoleSelect from "./UserRoleSelect";
import { UserWithProfile } from "./userRoleUtils";
import { format } from "date-fns";

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

  // Helper to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">Aucun utilisateur trouvé</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <UserRoleIcon role={user.role} />
              </TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                {user.first_name || user.last_name
                  ? `${user.first_name || ""} ${user.last_name || ""}`
                  : "—"}
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell>
                {canEditRoles ? (
                  <UserRoleSelect
                    value={user.role || "student"}
                    onChange={(newRole) => updateUserRole(user.id, newRole)}
                  />
                ) : (
                  <span className="capitalize">{user.role || "—"}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {canImpersonate && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => impersonateUser(user.id)}>
                        <User className="mr-2 h-4 w-4" />
                        Impersonifier
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoleTable;
