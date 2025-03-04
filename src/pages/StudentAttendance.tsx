
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, ArrowLeft, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getStudentById, getStudentAttendance, createStudentAttendance, updateStudentAttendance, deleteStudentAttendance } from "@/services/studentService";
import { Student, StudentAttendance, StudentAttendanceFormData } from "@/types/student";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const attendanceSchema = z.object({
  student_id: z.string(),
  date: z.string().min(1, "La date est obligatoire"),
  status: z.enum(["present", "absent", "late", "excused"], {
    required_error: "Le statut est obligatoire",
  }),
  notes: z.string().optional(),
});

const StudentAttendancePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<StudentAttendance | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<StudentAttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      student_id: id || '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      notes: '',
    },
  });
  
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

  const handleOpenForm = (attendance?: StudentAttendance) => {
    if (attendance) {
      setSelectedAttendance(attendance);
      form.reset({
        student_id: id || '',
        date: attendance.date,
        status: attendance.status,
        notes: attendance.notes || '',
      });
    } else {
      setSelectedAttendance(null);
      form.reset({
        student_id: id || '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        notes: '',
      });
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

  function getAttendanceStatusColor(status: string) {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getAvatarFallback(firstName: string, lastName: string) {
    return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() : "?";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex w-full pt-16">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 bg-teranga-background transition-all duration-300 flex items-center justify-center">
            <p>Chargement...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex w-full pt-16">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 bg-teranga-background transition-all duration-300 flex flex-col items-center justify-center p-4">
            <h1 className="text-xl font-bold mb-4">Étudiant non trouvé</h1>
            <Button onClick={() => navigate("/student-management")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste des étudiants
            </Button>
          </main>
        </div>
      </div>
    );
  }

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
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                      <AvatarFallback className="bg-teranga-blue text-white">
                        {getAvatarFallback(student.first_name, student.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base md:text-lg">
                        {student.first_name} {student.last_name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {student.school_name || "Aucune école assignée"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedAttendance ? "Modifier la présence" : "Ajouter une présence"}
                  </DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                    <input type="hidden" {...form.register("student_id")} />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statut *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="present">Présent</SelectItem>
                              <SelectItem value="absent">Absent</SelectItem>
                              <SelectItem value="late">En retard</SelectItem>
                              <SelectItem value="excused">Excusé</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Notes additionnelles" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsFormOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button type="submit">
                        {selectedAttendance ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Card>
              <CardHeader>
                <CardTitle>Historique des présences</CardTitle>
              </CardHeader>
              <CardContent>
                {attendance.length === 0 ? (
                  <div className="text-center py-10">
                    <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">Aucune donnée de présence disponible</p>
                    <Button onClick={() => handleOpenForm()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une présence
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Statut</th>
                          <th className="text-left py-3 px-4">Notes</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance.map((record) => (
                          <tr key={record.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={getAttendanceStatusColor(record.status)}>
                                {record.status === "present" && "Présent"}
                                {record.status === "absent" && "Absent"}
                                {record.status === "late" && "En retard"}
                                {record.status === "excused" && "Excusé"}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">{record.notes || "-"}</td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleOpenForm(record)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cela supprimera définitivement cette entrée de présence.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDelete(record.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
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

export default StudentAttendancePage;
