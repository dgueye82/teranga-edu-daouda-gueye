
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/services/student";
import { getSchools } from "@/services/school";
import { Student as StudentType, StudentFormData } from "@/types/student";
import { School } from "@/types/school";
import Navbar from "@/components/layout/Navbar";
import StudentTable from "@/components/students/StudentTable";
import StudentForm from "@/components/students/StudentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { confirm } from "@/components/ui/confirm";

// Ajouter l'import pour le nouveau composant
import { PlusCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const StudentManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentType | null>(null);

  const {
    data: students = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const { data: schools = [] as School[] } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  const createStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Étudiant ajouté",
        description: "L'étudiant a été ajouté avec succès",
      });
      setIsAddStudentOpen(false);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: StudentFormData }) =>
      updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Étudiant mis à jour",
        description: "Les informations de l'étudiant ont été mises à jour avec succès",
      });
      setIsAddStudentOpen(false);
      setStudentToEdit(null);
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Étudiant supprimé",
        description: "L'étudiant a été supprimé avec succès",
      });
    },
  });

  const handleEditStudent = (student: StudentType) => {
    setStudentToEdit(student);
    setIsAddStudentOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    const confirmed = await confirm({
      title: "Supprimer l'élève",
      description: "Êtes-vous sûr de vouloir supprimer cet élève ? Cette action est irréversible.",
    });

    if (confirmed) {
      deleteStudentMutation.mutate(studentId);
    }
  };

  const onSubmit = (data: StudentFormData) => {
    if (studentToEdit) {
      updateStudentMutation.mutate({ id: studentToEdit.id, data });
    } else {
      createStudentMutation.mutate(data);
    }
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestion des élèves</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Link to="/bulk-performance">
              <Button variant="outline" className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Évaluations en masse
              </Button>
            </Link>
            <Button
              onClick={() => setIsAddStudentOpen(true)}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un élève
            </Button>
          </div>
        </div>

        <StudentTable
          students={students}
          isLoading={isLoading}
          isError={isError}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />

        <StudentForm
          student={studentToEdit || undefined}
          schools={schools}
          onSubmit={onSubmit}
          isOpen={isAddStudentOpen}
          onOpenChange={setIsAddStudentOpen}
        />
      </div>
    </div>
  );
};

export default StudentManagement;
