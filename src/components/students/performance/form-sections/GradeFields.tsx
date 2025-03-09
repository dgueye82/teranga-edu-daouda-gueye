
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentPerformanceFormData } from "@/types/student";

interface GradeFieldsProps {
  form: UseFormReturn<StudentPerformanceFormData>;
  calculatePercentage?: () => string;
}

const GradeFields: React.FC<GradeFieldsProps> = ({ form, calculatePercentage }) => {
  return (
    <div className="space-y-4">
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
      
      {calculatePercentage && (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
          <p className="text-sm font-medium">
            Pourcentage: <span className="text-orange-600">{calculatePercentage()}%</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GradeFields;
