
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Shield, UserCheck, User, AlertCircle, Building, BookOpen, Users, FileText, School } from "lucide-react";
import { UserRole } from "@/types/auth";

type UserWithProfile = {
  id: string;
  email: string;
  role?: UserRole;
  first_name?: string;
  last_name?: string;
  created_at?: string;
};

const UserRoleManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

      // Map profiles by user ID for easy access
      const profilesMap = profiles.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {});

      setUsers(
        profiles.map((profile) => ({
          id: profile.id,
          email: profile.email,
          role: profile.role,
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
      // In a real implementation, you would need a backend endpoint to generate a session for the impersonated user
      toast({
        title: "Impersonification",
        description: "Dans un environnement de production, vous seriez maintenant connecté en tant que cet utilisateur.",
      });
      
      // Simulate redirection based on the impersonated user's role
      const user = users.find(u => u.id === userId);
      if (user?.role === "teacher" || user?.role === "director" || user?.role === "secretary") {
        window.location.href = "/staff-dashboard";
      } else if (user?.role === "admin" || user?.role === "inspector") {
        window.location.href = "/director-dashboard";
      } else if (user?.role === "student" || user?.role === "parent") {
        window.location.href = "/student-dashboard";
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

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get users filtered by role
  const getFilteredUsersByRole = (role: UserRole | "all") => {
    if (role === "all") return filteredUsers;
    return filteredUsers.filter((user) => user.role === role);
  };

  // Get role icon
  const getRoleIcon = (role?: UserRole) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "director":
        return <Building className="h-4 w-4 text-purple-500" />;
      case "secretary":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "teacher":
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case "parent":
        return <Users className="h-4 w-4 text-orange-500" />;
      case "student":
        return <User className="h-4 w-4 text-blue-500" />;
      case "inspector":
        return <School className="h-4 w-4 text-yellow-500" />;
      case "school_life":
        return <UserCheck className="h-4 w-4 text-teal-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  // Render users table
  const renderUsersTable = (users: UserWithProfile[]) => (
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
                {getRoleIcon(user.role)}
                {user.role || "Non défini"}
              </TableCell>
              <TableCell>
                <Select
                  value={user.role || ""}
                  onValueChange={(value) => updateUserRole(user.id, value as UserRole)}
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

        <Tabs defaultValue="all">
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

          <TabsContent value="all">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("all"))
            )}
          </TabsContent>

          <TabsContent value="admin">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("admin"))
            )}
          </TabsContent>

          <TabsContent value="director">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("director"))
            )}
          </TabsContent>

          <TabsContent value="secretary">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("secretary"))
            )}
          </TabsContent>

          <TabsContent value="teacher">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("teacher"))
            )}
          </TabsContent>

          <TabsContent value="parent">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("parent"))
            )}
          </TabsContent>

          <TabsContent value="student">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("student"))
            )}
          </TabsContent>

          <TabsContent value="inspector">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("inspector"))
            )}
          </TabsContent>

          <TabsContent value="school_life">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
              </div>
            ) : (
              renderUsersTable(getFilteredUsersByRole("school_life"))
            )}
          </TabsContent>
        </Tabs>
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
