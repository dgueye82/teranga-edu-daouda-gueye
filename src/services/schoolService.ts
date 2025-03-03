
import { supabase } from "@/integrations/supabase/client";
import { School, SchoolFormData } from "@/types/school";

export const getSchools = async (): Promise<School[]> => {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching schools:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const getSchoolById = async (id: string): Promise<School | null> => {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No results found
    }
    console.error("Error fetching school:", error);
    throw new Error(error.message);
  }

  return data;
};

export const createSchool = async (school: SchoolFormData): Promise<School> => {
  const { data, error } = await supabase
    .from("schools")
    .insert([school])
    .select()
    .single();

  if (error) {
    console.error("Error creating school:", error);
    throw new Error(error.message);
  }

  return data;
};

export const updateSchool = async (id: string, school: SchoolFormData): Promise<School> => {
  const { data, error } = await supabase
    .from("schools")
    .update(school)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating school:", error);
    throw new Error(error.message);
  }

  return data;
};

export const deleteSchool = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("schools")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting school:", error);
    throw new Error(error.message);
  }
};
