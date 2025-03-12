
import React from "react";
import { useForm } from "react-hook-form";
import { Student, StudentFormData } from "@/types/student";
import { School } from "@/types/school";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "./studentFormSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import form section components
import PersonalInfoFields from "./form-sections/PersonalInfoFields";
import SchoolInfoFields from "./form-sections/SchoolInfoFields";
import ContactInfoFields from "./form-sections/ContactInfoFields";
import ParentInfoFields from "./form-sections/ParentInfoFields";
import AdditionalInfoFields from "./form-sections/AdditionalInfoFields";

interface StudentFormProps {
  student?: Student;
  schools: School[];
  onSubmit: (data: StudentFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  schools,
  onSubmit,
  isOpen,
  onOpenChange,
}) => {
  // Initialize the form with student data or default values
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student
      ? {
          first_name: student.first_name,
          last_name: student.last_name,
          birth_date: student.birth_date || "",
          gender: student.gender || "",
          address: student.address || "",
          email: student.email || "",
          phone: student.phone || "",
          parent_name: student.parent_name || "",
          parent_phone: student.parent_phone || "",
          parent_email: student.parent_email || "",
          enrollment_date: student.enrollment_date || new Date().toISOString().split("T")[0],
          status: student.status || "active",
          school_id: student.school_id || "",
          photo_url: student.photo_url || "",
          notes: student.notes || "",
        }
      : {
          first_name: "",
          last_name: "",
          birth_date: "",
          gender: "",
          address: "",
          email: "",
          phone: "",
          parent_name: "",
          parent_phone: "",
          parent_email: "",
          enrollment_date: new Date().toISOString().split("T")[0],
          status: "active",
          school_id: "",
          photo_url: "",
          notes: "",
        },
  });

  const [uploading, setUploading] = useState(false);
  const photoUrl = form.watch("photo_url");

  // Generate generic photo URL if none exists
  React.useEffect(() => {
    if (!photoUrl && isOpen) {
      // Array of generic student photos
      const genericPhotos = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=300"
      ];
      
      // Select a random photo
      const randomPhoto = genericPhotos[Math.floor(Math.random() * genericPhotos.length)];
      form.setValue("photo_url", randomPhoto);
    }
  }, [isOpen, photoUrl, form]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
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
        
      // Update the form with the public URL
      form.setValue("photo_url", publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  };

  function getAvatarFallback(formData: StudentFormData) {
    return formData.first_name && formData.last_name 
      ? `${formData.first_name.charAt(0)}${formData.last_name.charAt(0)}`.toUpperCase() 
      : "?";
  }

  // Reset form values when student changes
  React.useEffect(() => {
    if (student && isOpen) {
      form.reset({
        first_name: student.first_name,
        last_name: student.last_name,
        birth_date: student.birth_date || "",
        gender: student.gender || "",
        address: student.address || "",
        email: student.email || "",
        phone: student.phone || "",
        parent_name: student.parent_name || "",
        parent_phone: student.parent_phone || "",
        parent_email: student.parent_email || "",
        enrollment_date: student.enrollment_date || new Date().toISOString().split("T")[0],
        status: student.status || "active",
        school_id: student.school_id || "",
        photo_url: student.photo_url || "",
        notes: student.notes || "",
      });
    } else if (!student && isOpen) {
      form.reset({
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        address: "",
        email: "",
        phone: "",
        parent_name: "",
        parent_phone: "",
        parent_email: "",
        enrollment_date: new Date().toISOString().split("T")[0],
        status: "active",
        school_id: "",
        photo_url: "",
        notes: "",
      });
    }
  }, [student, isOpen, form]);

  const handleSubmit = (data: StudentFormData) => {
    onSubmit(data);
    // Don't reset the form here, as it will be reset when the dialog closes
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {student ? "Modifier l'étudiant" : "Ajouter un nouvel étudiant"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            {/* Student Photo Section */}
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-2 border-2 border-gray-200">
                  <AvatarImage src={photoUrl} alt="Photo de l'étudiant" />
                  <AvatarFallback className="bg-teranga-blue text-white text-lg">
                    {getAvatarFallback(form.getValues())}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      disabled={uploading}
                      className="mb-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? "Téléchargement..." : "Changer la photo"}
                    </Button>
                  </label>
                </div>
                <input 
                  type="hidden" 
                  {...form.register("photo_url")} 
                />
              </div>
            </div>
            
            {/* Section: Personal Information */}
            <PersonalInfoFields form={form} />
            
            {/* Section: School Information */}
            <SchoolInfoFields form={form} schools={schools} />
            
            {/* Section: Contact Information */}
            <ContactInfoFields form={form} />
            
            {/* Section: Parent Information */}
            <ParentInfoFields form={form} />
            
            {/* Section: Additional Information */}
            <AdditionalInfoFields form={form} />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {student ? "Mettre à jour" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;

