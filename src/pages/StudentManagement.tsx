
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Menu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/services/student";
import { getSchools } from "@/services/schoolService";
import { Student, StudentFormData } from "@/types/student";
import { School } from "@/types/school";
import { useToast } from "@/components/ui/use-toast";
import StudentListTab from "@/components/students/StudentListTab";
import StudentDashboard from "@/components/students/StudentDashboard";
import { filterStudents } from "@/utils/studentFilters";

const StudentManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedStudents, fetchedSchools] = await Promise.all([
          getStudents(),
          getSchools()
        ]);
        setStudents(fetchedStudents);
        setSchools(fetchedSchools);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive"
        });
      }
    };
    
    fetchData();
  }, [toast]);

  const handleAddStudent = () => {
    setSelectedStudent(undefined);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
      toast({
        title: "Succès",
        description: "L'étudiant a été supprimé avec succès",
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'étudiant",
        variant: "destructive"
      });
    }
  };

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      if (selectedStudent) {
        const updatedStudent = await updateStudent(selectedStudent.id, data);
        setStudents(students.map(student => 
          student.id === selectedStudent.id ? updatedStudent : student
        ));
        toast({
          title: "Succès",
          description: "L'étudiant a été mis à jour avec succès",
        });
      } else {
        const newStudent = await createStudent(data);
        setStudents([...students, newStudent]);
        toast({
          title: "Succès",
          description: "L'étudiant a été ajouté avec succès",
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'étudiant",
        variant: "destructive"
      });
    }
  };

  const filteredStudents = filterStudents(students, searchTerm, schoolFilter, statusFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed z-50 bottom-6 left-6 p-3 rounded-full bg-teranga-blue text-white shadow-lg md:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <main className="flex-1 bg-teranga-background transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Gestion des élèves</h1>
              <p className="text-gray-600 mt-2">
                Gérez vos étudiants, suivez leur présence et leurs performances
              </p>
            </div>
            
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="list">Liste des élèves</TabsTrigger>
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                <StudentListTab
                  students={filteredStudents}
                  schools={schools}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  schoolFilter={schoolFilter}
                  setSchoolFilter={setSchoolFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  handleAddStudent={handleAddStudent}
                  handleEditStudent={handleEditStudent}
                  handleDeleteStudent={handleDeleteStudent}
                  handleFormSubmit={handleFormSubmit}
                  selectedStudent={selectedStudent}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                />
              </TabsContent>
              
              <TabsContent value="dashboard">
                <StudentDashboard 
                  students={students}
                  schools={schools}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default StudentManagement;
