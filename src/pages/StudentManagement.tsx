
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, Search, Plus, UserCheck, Clock, LineChart, GraduationCap, FileCheck } from "lucide-react";
import StudentList from "@/components/students/StudentList";
import StudentForm from "@/components/students/StudentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/services/studentService";
import { getSchools } from "@/services/schoolService";
import { Student, StudentFormData } from "@/types/student";
import { School } from "@/types/school";
import { useToast } from "@/components/ui/use-toast";

const StudentManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.phone && student.phone.includes(searchTerm));
      
    const matchesSchool = !schoolFilter || student.school_id === schoolFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });

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
              
              <TabsContent value="list" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
                    <div className="w-full md:w-1/2 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="Rechercher un étudiant..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-2 w-full md:w-1/2">
                      <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrer par école" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les écoles</SelectItem>
                          {schools.map(school => (
                            <SelectItem key={school.id} value={school.id}>
                              {school.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tous les statuts</SelectItem>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                          <SelectItem value="graduated">Diplômé</SelectItem>
                          <SelectItem value="suspended">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddStudent} className="shrink-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un étudiant
                  </Button>
                </div>
                
                <StudentForm 
                  student={selectedStudent}
                  schools={schools}
                  onSubmit={handleFormSubmit}
                  isOpen={isFormOpen}
                  onOpenChange={setIsFormOpen}
                />
                
                <Separator className="my-6" />
                
                <StudentList 
                  students={filteredStudents}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              </TabsContent>
              
              <TabsContent value="dashboard">
                <div className="bg-white rounded-xl p-6 shadow">
                  <h2 className="text-xl font-semibold mb-4">Vue d'ensemble des élèves</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-500 text-sm">Total des élèves</p>
                      <p className="text-2xl font-bold">{students.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-500 text-sm">Élèves actifs</p>
                      <p className="text-2xl font-bold">
                        {students.filter(s => s.status === 'active').length}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-500 text-sm">Écoles</p>
                      <p className="text-2xl font-bold">{schools.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-purple-500 text-sm">Diplômés</p>
                      <p className="text-2xl font-bold">
                        {students.filter(s => s.status === 'graduated').length}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Footer */}
          <footer className="bg-white py-8 border-t border-gray-100 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default StudentManagement;
