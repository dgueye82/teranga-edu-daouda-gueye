
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matière</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Mathématiques" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="evaluation_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'évaluation</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evaluation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'évaluation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="exam">Examen</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="homework">Devoir</SelectItem>
                        <SelectItem value="project">Projet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note obtenue</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note maximale</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaires</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Commentaires sur la performance de l'élève..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Facultatif: ajoutez des remarques sur cette évaluation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting ? "Enregistrement..." : mode === "create" ? "Enregistrer" : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPerformanceForm;
