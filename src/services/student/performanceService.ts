
import { supabase } from "@/integrations/supabase/client";
import { StudentPerformance, StudentPerformanceFormData } from "@/types/student";
import { PostgrestError } from "@supabase/supabase-js";

export const getStudentPerformances = async (studentId: string): Promise<StudentPerformance[]> => {
  const { data, error } = await supabase
    .from("student_performances")
    .select("*")
    .eq("student_id", studentId)
    .order("evaluation_date", { ascending: false }) as { data: StudentPerformance[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Error fetching student performances:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const createStudentPerformance = async (performance: StudentPerformanceFormData): Promise<StudentPerformance> => {
  const { data, error } = await supabase
    .from("student_performances")
    .insert([performance])
    .select()
    .single() as { data: StudentPerformance | null; error: PostgrestError | null };

  if (error) {
    console.error("Error creating student performance:", error);
    throw new Error(error.message);
  }

  return data as StudentPerformance;
};

export const updateStudentPerformance = async (id: string, performance: Partial<StudentPerformanceFormData>): Promise<StudentPerformance> => {
  const { data, error } = await supabase
    .from("student_performances")
    .update(performance)
    .eq("id", id)
    .select()
    .single() as { data: StudentPerformance | null; error: PostgrestError | null };

  if (error) {
    console.error("Error updating student performance:", error);
    throw new Error(error.message);
  }

  return data as StudentPerformance;
};

export const deleteStudentPerformance = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("student_performances")
    .delete()
    .eq("id", id) as { error: PostgrestError | null };

  if (error) {
    console.error("Error deleting student performance:", error);
    throw new Error(error.message);
  }
};
