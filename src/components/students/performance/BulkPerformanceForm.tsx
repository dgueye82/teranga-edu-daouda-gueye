
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import form section components
import SubjectDateFields from "./form-sections/SubjectDateFields";
import GradeFields from "./form-sections/GradeFields";
import NotesField from "./form-sections/NotesField";
import { studentPerformanceSchema } from "../../studentFormSchema";
import { StudentPerformanceFormData } from "@/types/student";

interface BulkPerformanceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<StudentPerformanceFormData, 'student_id'>) => void;
  isSubmitting: boolean;
}

const BulkPerformanceForm: React.FC<BulkPerformanceFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}) => {
  const { toast } = useToast();

  const form = useForm<Omit<StudentPerformanceFormData, 'student_id'>>({
    resolver: zodResolver(studentPerformanceSchema.omit({ student_id: true })),
    defaultValues: {
      subject: "",
      evaluation_date: new Date().toISOString().split("T")[0],
      grade: 0,
      max_grade: 20,
      evaluation_type: "exam",
      notes: "",
    },
  });

  const calculatePercentage = (): string => {
    const grade = form.watch("grade");
    const maxGrade = form.watch("max_grade");
    
    if (!maxGrade || maxGrade === 0) return "0";
    const percentage = (Number(grade) / Number(maxGrade)) * 100;
    return percentage.toFixed(1);
  };

  const handleSubmit = async (data: Omit<StudentPerformanceFormData, 'student_id'>) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout des évaluations",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Ajouter une évaluation pour tous les élèves
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <SubjectDateFields form={form} />
            <GradeFields form={form} calculatePercentage={calculatePercentage} />
            <NotesField form={form} />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Ajout en cours..." : "Ajouter pour tous les élèves"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BulkPerformanceForm;
