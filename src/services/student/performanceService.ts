
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

  return data || [];
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

  return data;
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

  return data;
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

export const createBulkPerformances = async (
  studentIds: string[],
  performanceTemplate: Omit<StudentPerformanceFormData, 'student_id'>
): Promise<StudentPerformance[]> => {
  // Préparer les données pour une insertion en masse
  const performancesToInsert = studentIds.map(studentId => ({
    student_id: studentId,
    ...performanceTemplate
  }));

  const { data, error } = await supabase
    .from("student_performances")
    .insert(performancesToInsert)
    .select();

  if (error) {
    console.error("Error creating bulk performances:", error);
    throw new Error(error.message);
  }

  return data || [];
};
