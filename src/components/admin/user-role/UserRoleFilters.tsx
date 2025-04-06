
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserRoleFiltersProps {
  activeTab: string;
  onChange: (value: string) => void;
  showAllTabs?: boolean;
  showTeacherTab?: boolean;
  showStudentTab?: boolean;
  showParentTab?: boolean;
}

const UserRoleFilters: React.FC<UserRoleFiltersProps> = ({
  activeTab,
  onChange,
  showAllTabs = true,
  showTeacherTab = true,
  showStudentTab = true,
  showParentTab = true,
}) => {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onChange}>
        <TabsList className="mb-4 flex-wrap">
          {showAllTabs && (
            <>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="admin">Administrateurs</TabsTrigger>
              <TabsTrigger value="director">Directeurs</TabsTrigger>
              <TabsTrigger value="secretary">Secrétaires</TabsTrigger>
              <TabsTrigger value="inspector">Inspecteurs</TabsTrigger>
            </>
          )}
          {showTeacherTab && <TabsTrigger value="teacher">Enseignants</TabsTrigger>}
          {showStudentTab && <TabsTrigger value="student">Élèves</TabsTrigger>}
          {showParentTab && <TabsTrigger value="parent">Parents</TabsTrigger>}
          {showAllTabs && <TabsTrigger value="school_life">Vie Scolaire</TabsTrigger>}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default UserRoleFilters;
