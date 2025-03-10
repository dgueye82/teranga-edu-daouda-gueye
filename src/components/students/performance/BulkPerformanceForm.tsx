
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Schéma pour la validation du formulaire d'évaluation en masse
const bulkPerformanceSchema = z.object({
  subject: z.string().min(1, "La matière est requise"),
  evaluation_date: z.string().min(1, "La date d'évaluation est requise"),
  grade: z.coerce.number().min(0, "La note doit être positive"),
  max_grade: z.coerce.number().min(1, "Le maximum doit être au moins 1"),
  evaluation_type: z.enum(["exam", "quiz", "homework", "project"]),
  notes: z.string().optional(),
});

export type BulkPerformanceFormData = z.infer<typeof bulkPerformanceSchema>;

interface BulkPerformanceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BulkPerformanceFormData) => void;
  isSubmitting: boolean;
}

const BulkPerformanceForm: React.FC<BulkPerformanceFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}) => {
  const { toast } = useToast();

  const form = useForm<BulkPerformanceFormData>({
    resolver: zodResolver(bulkPerformanceSchema),
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

  const handleSubmit = async (data: BulkPerformanceFormData) => {
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
