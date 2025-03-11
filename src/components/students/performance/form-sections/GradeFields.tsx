
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UseFormReturn } from "react-hook-form";
import { StudentPerformanceFormData } from "@/types/student";

interface GradeFieldsProps {
  form: UseFormReturn<StudentPerformanceFormData> | UseFormReturn<Omit<StudentPerformanceFormData, 'student_id'>>;
  calculatePercentage: () => string;
}

const GradeFields: React.FC<GradeFieldsProps> = ({ form, calculatePercentage }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control as any}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note obtenue</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.5" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control as any}
          name="max_grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note maximale</FormLabel>
              <FormControl>
                <Input type="number" min="1" step="1" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-2 mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Pourcentage</span>
          <span>{calculatePercentage()}%</span>
        </div>
        <Progress value={Number(calculatePercentage())} />
      </div>
    </>
  );
};

export default GradeFields;
