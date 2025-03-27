
import { supabase } from "@/integrations/supabase/client";
import { Student } from "@/types/student";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Récupère les élèves attribués à un enseignant spécifique
 * Pour l'instant, cette fonction simule la récupération des élèves d'un enseignant en retournant tous les élèves
 * Dans une implémentation réelle, nous filtrerions par l'ID de l'enseignant
 */
export const getTeacherStudents = async (teacherId: string): Promise<Student[]> => {
  console.log(`Récupération des élèves pour l'enseignant: ${teacherId}`);
  
  // Dans une implémentation future, nous utiliserons cette requête pour filtrer par enseignant_id
  // Pour l'instant, nous récupérons simplement tous les élèves
  const { data, error } = await supabase
    .from("students")
    .select("*, schools(name)")
    .order("last_name") as { data: (Student & { schools: { name: string } })[] | null; error: PostgrestError | null };

  if (error) {
    console.error("Erreur lors de la récupération des élèves de l'enseignant:", error);
    throw new Error(error.message);
  }

  return (data || []).map(student => ({
    ...student,
    school_name: student.schools?.name,
  }));
};

/**
 * Vérifie si un élève est attribué à un enseignant spécifique
 * Pour l'instant, cette fonction retourne toujours true car nous n'avons pas encore implémenté
 * la relation entre enseignants et élèves
 */
export const isStudentAssignedToTeacher = async (studentId: string, teacherId: string): Promise<boolean> => {
  // Cette fonction simulera la vérification si un élève est assigné à un enseignant
  // Dans une implémentation réelle, nous vérifierions dans la base de données
  console.log(`Vérification si l'élève ${studentId} est assigné à l'enseignant ${teacherId}`);
  return true;
};
