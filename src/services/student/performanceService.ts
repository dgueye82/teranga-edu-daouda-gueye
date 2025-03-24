
import { supabase } from "@/integrations/supabase/client";
import { StudentPerformance, StudentPerformanceFormData } from "@/types/student";

export const getStudentPerformances = async (studentId: string): Promise<StudentPerformance[]> => {
  const { data, error } = await supabase
    .from("student_performances")
    .select("*")
    .eq("student_id", studentId)
    .order("evaluation_date", { ascending: false });

  if (error) {
    console.error("Error fetching student performances:", error);
    throw new Error(error.message);
  }

  // Ensure evaluation_type matches the expected type
  return (data || []).map(item => ({
    ...item,
    evaluation_type: item.evaluation_type as "exam" | "quiz" | "homework" | "project"
  }));
};

export const createStudentPerformance = async (performance: StudentPerformanceFormData): Promise<StudentPerformance> => {
  const { data, error } = await supabase
    .from("student_performances")
    .insert([performance])
    .select()
    .single();

  if (error) {
    console.error("Error creating student performance:", error);
    throw new Error(error.message);
  }

  return {
    ...data,
    evaluation_type: data.evaluation_type as "exam" | "quiz" | "homework" | "project"
  };
};

export const updateStudentPerformance = async (id: string, performance: Partial<StudentPerformanceFormData>): Promise<StudentPerformance> => {
  const { data, error } = await supabase
    .from("student_performances")
    .update(performance)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating student performance:", error);
    throw new Error(error.message);
  }

  return {
    ...data,
    evaluation_type: data.evaluation_type as "exam" | "quiz" | "homework" | "project"
  };
};

export const deleteStudentPerformance = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("student_performances")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting student performance:", error);
    throw new Error(error.message);
  }
};
