
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentPerformanceFormData, StudentPerformance } from "@/types/student";
import { studentPerformanceSchema } from "../../studentFormSchema";

interface UsePerformanceFormProps {
  studentId: string;
  onSubmit: (data: StudentPerformanceFormData) => void;
  initialData?: StudentPerformance | null;
  mode?: "create" | "edit";
  onCancel: () => void;
}

export const usePerformanceForm = ({
  studentId,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
}: UsePerformanceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StudentPerformanceFormData>({
    resolver: zodResolver(studentPerformanceSchema),
    defaultValues: initialData
      ? {
          student_id: initialData.student_id,
          subject: initialData.subject,
          evaluation_date: initialData.evaluation_date,
          grade: initialData.grade,
          max_grade: initialData.max_grade,
          evaluation_type: initialData.evaluation_type,
          notes: initialData.notes || "",
        }
      : {
          student_id: studentId,
          subject: "",
          evaluation_date: new Date().toISOString().split("T")[0],
          grade: 0,
          max_grade: 20,
          evaluation_type: "exam",
          notes: "",
        },
  });

  // Reset form when initialData changes (important for editing different performances)
  useEffect(() => {
    if (initialData) {
      form.reset({
        student_id: initialData.student_id,
        subject: initialData.subject,
        evaluation_date: initialData.evaluation_date,
        grade: initialData.grade,
        max_grade: initialData.max_grade,
        evaluation_type: initialData.evaluation_type,
        notes: initialData.notes || "",
      });
    } else {
      form.reset({
        student_id: studentId,
        subject: "",
        evaluation_date: new Date().toISOString().split("T")[0],
        grade: 0,
        max_grade: 20,
        evaluation_type: "exam",
        notes: "",
      });
    }
  }, [initialData, studentId, form]);

  const calculatePercentage = (): string => {
    const grade = form.watch("grade");
    const maxGrade = form.watch("max_grade");
    
    if (!maxGrade || maxGrade === 0) return "0";
    const percentage = (Number(grade) / Number(maxGrade)) * 100;
    return percentage.toFixed(1);
  };

  const handleSubmit = async (data: StudentPerformanceFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit,
    onCancel,
    mode,
    calculatePercentage,
  };
};
