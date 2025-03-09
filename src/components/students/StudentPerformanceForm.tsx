
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentPerformanceFormData, StudentPerformance } from "@/types/student";
import { studentPerformanceSchema } from "./studentFormSchema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import form section components
import SubjectDateFields from "./performance/form-sections/SubjectDateFields";
import GradeFields from "./performance/form-sections/GradeFields";
import NotesField from "./performance/form-sections/NotesField";
import FormFooter from "./performance/form-sections/FormFooter";

interface StudentPerformanceFormProps {
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StudentPerformanceFormData) => void;
  isSubmitting: boolean;
  initialData?: StudentPerformance | null;
  mode?: "create" | "edit";
}

const StudentPerformanceForm: React.FC<StudentPerformanceFormProps> = ({
  studentId,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  initialData = null,
  mode = "create",
}) => {
  const form = useForm<StudentPerformanceFormData>({
    resolver: zodResolver(studentPerformanceSchema),
    defaultValues: initialData ? {
      student_id: initialData.student_id,
      subject: initialData.subject,
      evaluation_date: initialData.evaluation_date,
      grade: initialData.grade,
      max_grade: initialData.max_grade,
      evaluation_type: initialData.evaluation_type,
      notes: initialData.notes || "",
    } : {
      student_id: studentId,
      subject: "",
      evaluation_date: new Date().toISOString().split("T")[0],
      grade: 0,
      max_grade: 20,
      evaluation_type: "exam",
      notes: "",
    },
  });

  const handleSubmit = (data: StudentPerformanceFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Ajouter une évaluation" : "Modifier l'évaluation"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <SubjectDateFields form={form} />
            <GradeFields form={form} />
            <NotesField form={form} />
            <FormFooter 
              isSubmitting={isSubmitting} 
              onCancel={() => onOpenChange(false)} 
              mode={mode} 
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPerformanceForm;
