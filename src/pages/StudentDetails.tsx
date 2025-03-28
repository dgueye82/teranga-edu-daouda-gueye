import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, ArrowLeft, Edit, Mail, Phone, School, Calendar, UserCheck, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getStudentById } from "@/services/studentService";
import { getStudentAttendance } from "@/services/studentService";
import { getStudentPerformances } from "@/services/studentService";
import { Student, StudentAttendance, StudentPerformance } from "@/types/student";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [performances, setPerformances] = useState<StudentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [fetchedStudent, fetchedAttendance, fetchedPerformances] = await Promise.all([
          getStudentById(id),
          getStudentAttendance(id),
          getStudentPerformances(id)
        ]);
        
        setStudent(fetchedStudent);
        setAttendance(fetchedAttendance);
        setPerformances(fetchedPerformances);
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

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!student || !event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${id}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      setUploading(true);
      
      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('student-photos')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('student-photos')
        .getPublicUrl(filePath);
        
      // Update the student record with the new photo URL
      const { error: updateError } = await supabase
        .from('students')
        .update({ photo_url: publicUrl })
        .eq('id', student.id);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update the local state
      setStudent({
        ...student,
        photo_url: publicUrl
      });
      
      toast({
        title: "Succès",
        description: "La photo de l'élève a été mise à jour",
      });
      
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la photo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  function handleEditStudent() {
    // Navigate to edit page or open edit modal
    navigate(`/student-management`);
    // You could add state to directly open the edit modal
  }

  function getStatusColor(status: string | undefined) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

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
        
        <main className="flex-1 bg-white transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigate("/student-management")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <h1 className="text-2xl font-bold text-gray-800">Détails de l'élève</h1>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/student/${student.id}/report-card`)} variant="outline">
                  Bulletin de notes
                </Button>
                <Button onClick={handleEditStudent}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6 pb-0">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-2 border-gray-200">
                      <AvatarImage src={student.photo_url} alt={`${student.first_name} ${student.last_name}`} />
                      <AvatarFallback className="bg-teranga-blue text-white text-2xl">
                        {getAvatarFallback(student.first_name, student.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity">
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex items-center justify-center bg-black bg-opacity-50 rounded-full w-24 h-24 cursor-pointer"
                      >
                        {uploading ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Upload className="w-6 h-6 text-white" />
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">
                        {student.first_name} {student.last_name}
                      </h2>
                      <Badge className={`${getStatusColor(student.status)} md:ml-2`}>
                        {student.status === "active" && "Actif"}
                        {student.status === "inactive" && "Inactif"}
                        {student.status === "graduated" && "Diplômé"}
                        {student.status === "suspended" && "Suspendu"}
                        {!student.status && "Non défini"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {student.school_name && (
                        <div className="flex items-center">
                          <School className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{student.school_name}</span>
                        </div>
                      )}
                      {student.email && (
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                      {student.birth_date && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <span>Naissance: {new Date(student.birth_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {student.enrollment_date && (
                        <div className="flex items-center">
                          <UserCheck className="h-5 w-5 text-gray-400 mr-2" />
                          <span>Inscrit: {new Date(student.enrollment_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {student.address && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{student.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="details" className="w-full mt-6">
                <div className="px-6">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="details">Informations détaillées</TabsTrigger>
                    <TabsTrigger value="attendance">Présences ({attendance.length})</TabsTrigger>
                    <TabsTrigger value="performance">Performances ({performances.length})</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="details" className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informations personnelles</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Prénom</p>
                            <p>{student.first_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Nom</p>
                            <p>{student.last_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Genre</p>
                            <p>{student.gender || "Non spécifié"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date de naissance</p>
                            <p>{student.birth_date ? new Date(student.birth_date).toLocaleDateString() : "Non spécifiée"}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500">Adresse</p>
                          <p>{student.address || "Non spécifiée"}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{student.email || "Non spécifié"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p>{student.phone || "Non spécifié"}</p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500">Parent/Tuteur</p>
                          <p>{student.parent_name || "Non spécifié"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email du parent</p>
                          <p>{student.parent_email || "Non spécifié"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone du parent</p>
                          <p>{student.parent_phone || "Non spécifié"}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{student.notes || "Aucune note disponible."}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="attendance" className="p-6 pt-0">
                  {attendance.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Aucune donnée de présence disponible</p>
                      <Button className="mt-4" onClick={() => navigate(`/student-management/attendance/${student.id}`)}>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="performance" className="p-6 pt-0">
                  {performances.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Aucune donnée de performance disponible</p>
                      <Button className="mt-4" onClick={() => navigate(`/student-management/performance/${student.id}`)}>
                        Ajouter une évaluation
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Matière</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Note</th>
                            <th className="text-left py-3 px-4">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {performances.map((record) => (
                            <tr key={record.id} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4">{record.subject}</td>
                              <td className="py-4 px-4">
                                <Badge className="bg-gray-100 text-gray-800">
                                  {record.evaluation_type === "exam" && "Examen"}
                                  {record.evaluation_type === "quiz" && "Quiz"}
                                  {record.evaluation_type === "homework" && "Devoir"}
                                  {record.evaluation_type === "project" && "Projet"}
                                </Badge>
                              </td>
                              <td className="py-4 px-4">
                                {new Date(record.evaluation_date).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`font-semibold ${
                                  (record.grade / record.max_grade) >= 0.7 ? 'text-green-600' : 
                                  (record.grade / record.max_grade) >= 0.5 ? 'text-yellow-600' : 
                                  'text-red-600'
                                }`}>
                                  {record.grade} / {record.max_grade}
                                </span>
                              </td>
                              <td className="py-4 px-4">{record.notes || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
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

export default StudentDetails;
