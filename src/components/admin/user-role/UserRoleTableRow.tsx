
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
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

interface UserRoleTableRowProps {
  user: UserWithProfile;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  impersonateUser: (userId: string) => Promise<void>;
  canEditRoles: boolean;
  canImpersonate: boolean;
}

const UserRoleTableRow: React.FC<UserRoleTableRowProps> = ({
  user,
  updateUserRole,
  impersonateUser,
  canEditRoles,
  canImpersonate,
}) => {
  // Helper to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
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
  );
};

export default UserRoleTableRow;
