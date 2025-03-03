
import { useState } from "react";
import { School } from "@/types/school";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Phone, Mail, Globe, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface SchoolListProps {
  schools: School[];
  onEdit: (school: School) => void;
  onDelete: (id: string) => Promise<void>;
}

const SchoolList = ({ schools, onEdit, onDelete }: SchoolListProps) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
      toast({
        title: "École supprimée",
        description: "L'école a été supprimée avec succès",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la suppression",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (schools.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Aucune école n'a été ajoutée.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schools.map((school) => (
        <Card key={school.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">{school.name}</CardTitle>
            {school.address && (
              <CardDescription className="flex items-start mt-2">
                <Building className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                {school.address}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            {school.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{school.phone}</span>
              </div>
            )}
            {school.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{school.email}</span>
              </div>
            )}
            {school.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <a 
                  href={school.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {school.website}
                </a>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 bg-gray-50 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(school)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Elle supprimera définitivement l'école
                    "{school.name}" et toutes les données associées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(school.id)}
                    disabled={deletingId === school.id}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {deletingId === school.id ? "Suppression..." : "Supprimer"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SchoolList;
