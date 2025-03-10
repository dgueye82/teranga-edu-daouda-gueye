
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Student, StudentAttendance, StudentAttendanceFormData } from "@/types/student";
import { getStudentById } from "@/services/studentService";
import { getStudentAttendance, createStudentAttendance, updateStudentAttendance, deleteStudentAttendance } from "@/services/student/attendanceService";
import StudentHeader from "@/components/students/attendance/StudentHeader";
import AttendanceList from "@/components/students/attendance/AttendanceList";
import AttendanceFormDialog from "@/components/students/attendance/AttendanceFormDialog";
import Footer from "@/components/layout/Footer";

const StudentAttendancePage = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<StudentAttendance | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [fetchedStudent, fetchedAttendance] = await Promise.all([
          getStudentById(id),
          getStudentAttendance(id)
        ]);
        
        setStudent(fetchedStudent);
        setAttendance(fetchedAttendance);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'étudiant",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);

  const handleOpenForm = (attendanceRecord?: StudentAttendance) => {
    if (attendanceRecord) {
      setSelectedAttendance(attendanceRecord);
    } else {
      setSelectedAttendance(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: StudentAttendanceFormData) => {
    try {
      if (selectedAttendance) {
        const updatedAttendance = await updateStudentAttendance(selectedAttendance.id, data);
        setAttendance(attendance.map(item => 
          item.id === updatedAttendance.id ? updatedAttendance : item
        ));
        toast({
          title: "Succès",
          description: "Présence mise à jour avec succès",
        });
      } else {
        const newAttendance = await createStudentAttendance(data);
        setAttendance([...attendance, newAttendance]);
        toast({
          title: "Succès",
          description: "Présence ajoutée avec succès",
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la présence",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudentAttendance(id);
      setAttendance(attendance.filter(item => item.id !== id));
      toast({
        title: "Succès",
        description: "Présence supprimée avec succès",
      });
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la présence",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-teranga-background pt-16 flex items-center justify-center">
          <p>Chargement...</p>
        </main>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-teranga-background pt-16 flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-bold mb-4">Étudiant non trouvé</h1>
          <Button onClick={() => navigate("/student-management")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste des étudiants
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-teranga-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(`/student-management/details/${id}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Suivi des présences</h1>
            </div>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une présence
            </Button>
          </div>
          
          {student && <StudentHeader student={student} />}
          
          <AttendanceFormDialog 
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            selectedAttendance={selectedAttendance}
            studentId={id || ''}
            onSubmit={handleSubmit}
          />
          
          <AttendanceList 
            attendance={attendance}
            onEdit={handleOpenForm}
            onDelete={handleDelete}
            onAddNew={() => handleOpenForm()}
          />
          
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default StudentAttendancePage;
