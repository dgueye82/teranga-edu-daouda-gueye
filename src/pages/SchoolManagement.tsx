
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { School, SchoolFormData } from "@/types/school";
import { getSchools, createSchool, updateSchool, deleteSchool } from "@/services/schoolService";
import SchoolForm from "@/components/schools/SchoolForm";
import SchoolList from "@/components/schools/SchoolList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SchoolManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: schools = [], isLoading, refetch } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  // Force refetch when auth state changes
  useEffect(() => {
    console.log("Auth state changed in SchoolManagement, refetching schools...");
    refetch();
  }, [user, refetch]);

  useEffect(() => {
    console.log(`SchoolManagement rendered with ${schools.length} schools`);
  }, [schools]);

  const createMutation = useMutation({
    mutationFn: createSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setIsDialogOpen(false);
      toast({
        title: "École créée",
        description: "L'école a été créée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'école",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SchoolFormData }) => updateSchool(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setIsDialogOpen(false);
      setEditingSchool(null);
      toast({
        title: "École mise à jour",
        description: "L'école a été mise à jour avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de l'école",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast({
        title: "École supprimée",
        description: "L'école a été supprimée avec succès",
      });
    },
  });

  const handleSubmit = async (data: SchoolFormData) => {
    if (editingSchool) {
      await updateMutation.mutateAsync({ id: editingSchool.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingSchool(null);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des écoles</h1>
            <p className="text-gray-600 mt-1">
              Ajouter, modifier ou supprimer des écoles dans le système
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/school-students")}>
              <Users className="h-4 w-4 mr-2" />
              Voir les élèves par école
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingSchool(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une école
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingSchool ? "Modifier l'école" : "Ajouter une nouvelle école"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingSchool
                      ? "Modifiez les informations de l'école ci-dessous."
                      : "Remplissez les informations pour ajouter une nouvelle école."}
                  </DialogDescription>
                </DialogHeader>
                <SchoolForm
                  initialData={editingSchool || undefined}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator className="my-6" />

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
          </div>
        ) : (
          <SchoolList
            schools={schools}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default SchoolManagement;
