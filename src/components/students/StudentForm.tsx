
import React from "react";
import { useForm } from "react-hook-form";
import { Student, StudentFormData } from "@/types/student";
import { School } from "@/types/school";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "./studentFormSchema";

// Import form section components
import PersonalInfoFields from "./form-sections/PersonalInfoFields";
import SchoolInfoFields from "./form-sections/SchoolInfoFields";
import ContactInfoFields from "./form-sections/ContactInfoFields";
import ParentInfoFields from "./form-sections/ParentInfoFields";
import AdditionalInfoFields from "./form-sections/AdditionalInfoFields";
import PhotoUploadSection from "./form-sections/PhotoUploadSection";
import FormFooterButtons from "./form-sections/FormFooterButtons";

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
            <PhotoUploadSection form={form} />
            
            <PersonalInfoFields form={form} />
            
            <SchoolInfoFields form={form} schools={schools} />
            
            <ContactInfoFields form={form} />
            
            <ParentInfoFields form={form} />
            
            <AdditionalInfoFields form={form} />

            <DialogFooter>
              <FormFooterButtons 
                onClose={() => onOpenChange(false)} 
                isEditing={!!student} 
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
