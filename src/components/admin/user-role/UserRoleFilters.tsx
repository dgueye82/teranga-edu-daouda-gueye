
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types/auth";

interface UserRoleFiltersProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const UserRoleFilters: React.FC<UserRoleFiltersProps> = ({ activeTab, onChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onChange}>
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="admin">Administrateurs</TabsTrigger>
        <TabsTrigger value="director">Directeurs</TabsTrigger>
        <TabsTrigger value="secretary">Secrétaires</TabsTrigger>
        <TabsTrigger value="teacher">Enseignants</TabsTrigger>
        <TabsTrigger value="parent">Parents</TabsTrigger>
        <TabsTrigger value="student">Élèves</TabsTrigger>
        <TabsTrigger value="inspector">Inspecteurs</TabsTrigger>
        <TabsTrigger value="school_life">Vie Scolaire</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default UserRoleFilters;
