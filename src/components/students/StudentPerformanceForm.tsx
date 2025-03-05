
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StudentPerformanceFormData } from "@/types/student";

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

const performanceSchema = z.object({
  student_id: z.string(),
  subject: z.string().min(1, "La matière est requise"),
  evaluation_date: z.string().min(1, "La date d'évaluation est requise"),
  grade: z.coerce.number().min(0, "La note doit être positive"),
  max_grade: z.coerce.number().min(1, "Le maximum doit être au moins 1"),
  evaluation_type: z.enum(["exam", "quiz", "homework", "project"]),
  notes: z.string().optional(),
});

interface StudentPerformanceFormProps {
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StudentPerformanceFormData) => void;
  isSubmitting: boolean;
}

const StudentPerformanceForm: React.FC<StudentPerformanceFormProps> = ({
  studentId,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<StudentPerformanceFormData>({
    resolver: zodResolver(performanceSchema),
    defaultValues: {
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
          <DialogTitle>Ajouter une évaluation</DialogTitle>
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
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPerformanceForm;
