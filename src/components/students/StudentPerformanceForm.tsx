
import React from "react";
import { StudentPerformanceFormData, StudentPerformance } from "@/types/student";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

// Import form section components
import SubjectDateFields from "./performance/form-sections/SubjectDateFields";
import GradeFields from "./performance/form-sections/GradeFields";
import NotesField from "./performance/form-sections/NotesField";
import FormFooter from "./performance/form-sections/FormFooter";
import { usePerformanceForm } from "./performance/hooks/usePerformanceForm";

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
  initialData = null,
  mode = "create",
}) => {
  const { 
    form, 
    isSubmitting, 
    handleSubmit, 
    onCancel,
    calculatePercentage
  } = usePerformanceForm({
    studentId,
    onSubmit,
    initialData,
    mode,
    onCancel: () => onOpenChange(false),
  });

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
            <GradeFields form={form} calculatePercentage={calculatePercentage} />
            <NotesField form={form} />
            <FormFooter 
              isSubmitting={isSubmitting} 
              onCancel={onCancel} 
              mode={mode} 
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPerformanceForm;
