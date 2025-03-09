
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { StudentPerformanceFormData } from "@/types/student";

interface NotesFieldProps {
  form: UseFormReturn<StudentPerformanceFormData>;
}

const NotesField: React.FC<NotesFieldProps> = ({ form }) => {
  return (
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
  );
};

export default NotesField;
