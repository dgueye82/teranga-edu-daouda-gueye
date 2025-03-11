
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StudentPerformanceFormData } from "@/types/student";

interface SubjectDateFieldsProps {
  form: UseFormReturn<StudentPerformanceFormData> | UseFormReturn<Omit<StudentPerformanceFormData, 'student_id'>>;
}

const SubjectDateFields: React.FC<SubjectDateFieldsProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

export default SubjectDateFields;
