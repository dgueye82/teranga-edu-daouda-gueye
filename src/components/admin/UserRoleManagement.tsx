
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { UserRole } from "@/types/auth";
import UserRoleTable from "./user-role/UserRoleTable";
import UserRoleFilters from "./user-role/UserRoleFilters";
import { UserWithProfile, filterUsersBySearch, filterUsersByRole } from "./user-role/userRoleUtils";

const UserRoleManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Fetch all users and their profiles
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*");

      if (profilesError) {
        throw profilesError;
      }

      setUsers(
        profiles.map((profile) => ({
          id: profile.id,
          email: profile.email,
          role: profile.role as UserRole,
          first_name: profile.first_name,
          last_name: profile.last_name,
          created_at: profile.created_at,
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la récupération des utilisateurs",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update a user's role
  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ role })
        .eq("id", userId)
        .select();

      if (error) throw error;

      // Update the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      );

      toast({
        title: "Rôle mis à jour",
        description: `L'utilisateur a maintenant le rôle ${role}.`,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour du rôle",
        description: error.message,
      });
    }
  };

  // Impersonate a user (log in as them)
  const impersonateUser = async (userId: string) => {
    try {
      // Store the current admin user ID for later restoration
      const sessionResponse = await supabase.auth.getSession();
      
      if (sessionResponse.error) throw sessionResponse.error;
      
      if (sessionResponse.data.session) {
        localStorage.setItem("adminUserId", sessionResponse.data.session.user.id || "");
      }
      
      // For demo purposes, we'll just show a toast and redirect
      toast({
        title: "Impersonification",
        description: "Dans un environnement de production, vous seriez maintenant connecté en tant que cet utilisateur.",
      });
      
      // Redirect based on the impersonated user's role
      const user = users.find(u => u.id === userId);
      if (user) {
        if (user.role === "teacher" || user.role === "director" || user.role === "secretary") {
          window.location.href = "/staff-dashboard";
        } else if (user.role === "admin" || user.role === "inspector") {
          window.location.href = "/director-dashboard";
        } else if (user.role === "student" || user.role === "parent" || user.role === "school_life") {
          window.location.href = "/student-dashboard";
        }
      }
    } catch (error) {
      console.error("Error impersonating user:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'impersonification",
        description: error.message,
      });
    }
  };

  // Filter users based on search term and active tab
  const filteredUsers = filterUsersBySearch(users, searchTerm);
  const getFilteredUsersByRole = (role: UserRole | "all") => filterUsersByRole(filteredUsers, role);

  const renderTabContent = (role: UserRole | "all") => (
    <UserRoleTable 
      users={getFilteredUsersByRole(role)} 
      updateUserRole={updateUserRole}
      impersonateUser={impersonateUser}
      isLoading={isLoading}
    />
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Rôles Utilisateurs</CardTitle>
        <CardDescription>
          Attribuez des rôles aux utilisateurs et impersonifiez des comptes directeur ou enseignant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Input
            placeholder="Rechercher par email ou nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <UserRoleFilters activeTab={activeTab} onChange={setActiveTab} />

        <TabsContent value="all">{renderTabContent("all")}</TabsContent>
        <TabsContent value="admin">{renderTabContent("admin")}</TabsContent>
        <TabsContent value="director">{renderTabContent("director")}</TabsContent>
        <TabsContent value="secretary">{renderTabContent("secretary")}</TabsContent>
        <TabsContent value="teacher">{renderTabContent("teacher")}</TabsContent>
        <TabsContent value="parent">{renderTabContent("parent")}</TabsContent>
        <TabsContent value="student">{renderTabContent("student")}</TabsContent>
        <TabsContent value="inspector">{renderTabContent("inspector")}</TabsContent>
        <TabsContent value="school_life">{renderTabContent("school_life")}</TabsContent>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Total: {filteredUsers.length} utilisateurs
        </div>
        <Button onClick={fetchUsers}>Rafraîchir</Button>
      </CardFooter>
    </Card>
  );
};

export default UserRoleManagement;
