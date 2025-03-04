
import { supabase } from "@/integrations/supabase/client";
import { Student, StudentFormData, StudentAttendance, StudentAttendanceFormData, StudentPerformance, StudentPerformanceFormData } from "@/types/student";
import { PostgrestError } from "@supabase/supabase-js";

// Services pour les étudiants
export const getStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*, schools(name)")
    .order("last_name") as { data: (Student & { schools: { name: string } })[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Error fetching students:", error);
    throw new Error(error.message);
  }

  // Transform the response to match our Student interface
  return (data || []).map(student => ({
    ...student,
    school_name: student.schools?.name,
  }));
};

export const getStudentsBySchool = async (schoolId: string): Promise<Student[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*, schools(name)")
    .eq("school_id", schoolId)
    .order("last_name") as { data: (Student & { schools: { name: string } })[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Error fetching students by school:", error);
    throw new Error(error.message);
  }

  return (data || []).map(student => ({
    ...student,
    school_name: student.schools?.name,
  }));
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const { data, error } = await supabase
    .from("students")
    .select("*, schools(name)")
    .eq("id", id)
    .single() as { data: (Student & { schools: { name: string } }) | null; error: PostgrestError | null };

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No results found
    }
    console.error("Error fetching student:", error);
    throw new Error(error.message);
  }

  if (!data) return null;

  return {
    ...data,
    school_name: data.schools?.name,
  };
};

export const createStudent = async (student: StudentFormData): Promise<Student> => {
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select()
    .single() as { data: Student | null; error: PostgrestError | null };

  if (error) {
    console.error("Error creating student:", error);
    throw new Error(error.message);
  }

  return data as Student;
};

export const updateStudent = async (id: string, student: StudentFormData): Promise<Student> => {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .select()
    .single() as { data: Student | null; error: PostgrestError | null };

  if (error) {
    console.error("Error updating student:", error);
    throw new Error(error.message);
  }

  return data as Student;
};

export const deleteStudent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id) as { error: PostgrestError | null };

  if (error) {
    console.error("Error deleting student:", error);
    throw new Error(error.message);
  }
};

// Services pour les présences des étudiants
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

// Services pour les performances des étudiants
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
