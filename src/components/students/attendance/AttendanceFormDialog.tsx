import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentAttendance, StudentAttendanceFormData } from "@/types/student";
import { ArrowLeft } from "lucide-react";

const attendanceSchema = z.object({
  student_id: z.string(),
  date: z.string().min(1, "La date est obligatoire"),
  status: z.enum(["present", "absent", "late", "excused"], {
    required_error: "Le statut est obligatoire",
  }),
  notes: z.string().optional(),
});

interface AttendanceFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedAttendance: StudentAttendance | null;
  studentId: string;
  onSubmit: (data: StudentAttendanceFormData) => Promise<void>;
}

const AttendanceFormDialog = ({
  isOpen,
  setIsOpen,
  selectedAttendance,
  studentId,
  onSubmit,
}: AttendanceFormDialogProps) => {
  const form = useForm<StudentAttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      student_id: studentId,
      date: selectedAttendance?.date || new Date().toISOString().split("T")[0],
      status: selectedAttendance?.status || "present",
      notes: selectedAttendance?.notes || "",
    },
  });

  const handleSubmit = async (data: StudentAttendanceFormData) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <DialogFooter className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="mr-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="mr-2"
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {selectedAttendance ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceFormDialog;
