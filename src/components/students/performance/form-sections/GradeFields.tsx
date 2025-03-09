
import React, { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { StudentPerformanceFormData } from "@/types/student";

interface GradeFieldsProps {
  form: UseFormReturn<StudentPerformanceFormData>;
  calculatePercentage?: () => string;
}

const GradeFields: React.FC<GradeFieldsProps> = ({ form, calculatePercentage }) => {
  const [percentage, setPercentage] = useState<string>("0");
  
  // Watch for changes in grade and max_grade
  const grade = useWatch({
    control: form.control,
    name: "grade",
  });
  
  const maxGrade = useWatch({
    control: form.control,
    name: "max_grade",
  });
  
  // Update percentage whenever grade or maxGrade changes
  useEffect(() => {
    if (calculatePercentage) {
      setPercentage(calculatePercentage());
    } else if (maxGrade && maxGrade > 0) {
      const calc = (Number(grade) / Number(maxGrade)) * 100;
      setPercentage(calc.toFixed(1));
    }
  }, [grade, maxGrade, calculatePercentage]);

  // Determine color based on percentage
  const getPercentageColor = () => {
    const value = parseFloat(percentage);
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-orange-600";
    if (value >= 40) return "text-amber-600";
    return "text-red-600";
  };

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
      
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
        <p className="text-sm font-medium">
          Pourcentage: <span className={getPercentageColor()}>{percentage}%</span>
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div 
            className="h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ 
              width: `${Math.min(100, parseFloat(percentage))}%`, 
              backgroundColor: parseFloat(percentage) >= 80 ? '#16a34a' : 
                              parseFloat(percentage) >= 60 ? '#ea580c' : 
                              parseFloat(percentage) >= 40 ? '#d97706' : 
                              '#dc2626'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GradeFields;
