
import { supabase } from "@/integrations/supabase/client";
import { StudentAttendance, StudentAttendanceFormData } from "@/types/student";
import { PostgrestError } from "@supabase/supabase-js";

export const getStudentAttendance = async (studentId: string): Promise<StudentAttendance[]> => {
  const { data, error } = await supabase
    .from("student_attendance")
    .select("*")
    .eq("student_id", studentId)
    .order("date", { ascending: false }) as { data: StudentAttendance[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Error fetching student attendance:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const createStudentAttendance = async (attendance: StudentAttendanceFormData): Promise<StudentAttendance> => {
  const { data, error } = await supabase
    .from("student_attendance")
    .insert([attendance])
    .select()
    .single() as { data: StudentAttendance | null; error: PostgrestError | null };

  if (error) {
    console.error("Error creating student attendance:", error);
    throw new Error(error.message);
  }

  return data as StudentAttendance;
};

export const updateStudentAttendance = async (id: string, attendance: Partial<StudentAttendanceFormData>): Promise<StudentAttendance> => {
  const { data, error } = await supabase
    .from("student_attendance")
    .update(attendance)
    .eq("id", id)
    .select()
    .single() as { data: StudentAttendance | null; error: PostgrestError | null };

  if (error) {
    console.error("Error updating student attendance:", error);
    throw new Error(error.message);
  }

  return data as StudentAttendance;
};

export const deleteStudentAttendance = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("student_attendance")
    .delete()
    .eq("id", id) as { error: PostgrestError | null };

  if (error) {
    console.error("Error deleting student attendance:", error);
    throw new Error(error.message);
  }
};
