
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/services/student";
import { getStudentsBySchool } from "@/services/student/studentService";
import { useSchoolScope } from "@/contexts/SchoolContext";
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
import StudentOverviewDashboard from "@/components/students/StudentOverviewDashboard";

const StudentManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentType | null>(null);

  const { activeSchoolId } = useSchoolScope();

  const {
    data: students = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["students", activeSchoolId],
    queryFn: () => (activeSchoolId ? getStudentsBySchool(activeSchoolId) : getStudents()),
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord des élèves</h1>
            <p className="text-muted-foreground mt-1">
              Suivi des paiements, retards et absences
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
            <Link to="/bulk-performance">
              <Button variant="outline" className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Évaluations en masse
              </Button>
            </Link>
            <Button
              onClick={() => setIsAddStudentOpen(true)}
              className="w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un élève
            </Button>
          </div>
        </div>

        <StudentOverviewDashboard />

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
