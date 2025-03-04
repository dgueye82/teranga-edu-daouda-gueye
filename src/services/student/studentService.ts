
import { supabase } from "@/integrations/supabase/client";
import { Student, StudentFormData } from "@/types/student";
import { PostgrestError } from "@supabase/supabase-js";

export const getStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*, schools(name)")
    .order("last_name") as { data: (Student & { schools: { name: string } })[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Error fetching students:", error);
    throw new Error(error.message);
  }

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
  // If school_id is empty string, set it to null
  if (student.school_id === "") {
    student.school_id = null;
  }

  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select("*, schools(name)")
    .single() as { data: (Student & { schools: { name: string } }) | null; error: PostgrestError | null };

  if (error) {
    console.error("Error creating student:", error);
    throw new Error(error.message);
  }

  return {
    ...data!,
    school_name: data?.schools?.name,
  } as Student;
};

export const updateStudent = async (id: string, student: StudentFormData): Promise<Student> => {
  // If school_id is empty string, set it to null
  if (student.school_id === "") {
    student.school_id = null;
  }
  
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .select("*, schools(name)")
    .single() as { data: (Student & { schools: { name: string } }) | null; error: PostgrestError | null };

  if (error) {
    console.error("Error updating student:", error);
    throw new Error(error.message);
  }

  return {
    ...data!,
    school_name: data?.schools?.name,
  } as Student;
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
