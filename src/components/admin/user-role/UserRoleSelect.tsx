
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types/auth";

interface UserRoleSelectProps {
  value: UserRole | string;
  onValueChange: (value: UserRole) => void;
}

const UserRoleSelect: React.FC<UserRoleSelectProps> = ({ value, onValueChange }) => {
  return (
    <Select
      value={value || ""}
      onValueChange={(value) => onValueChange(value as UserRole)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner un rôle" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Administrateur</SelectItem>
        <SelectItem value="director">Directeur d'École</SelectItem>
        <SelectItem value="secretary">Secrétaire</SelectItem>
        <SelectItem value="teacher">Enseignant</SelectItem>
        <SelectItem value="parent">Parent</SelectItem>
        <SelectItem value="student">Élève</SelectItem>
        <SelectItem value="inspector">Inspecteur</SelectItem>
        <SelectItem value="school_life">Vie Scolaire</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserRoleSelect;
