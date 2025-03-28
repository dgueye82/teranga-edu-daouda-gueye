
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

export const calculateStudentAverage = async (studentId: string): Promise<{
  overallAverage: number;
  totalGrade: number;
  totalMaxGrade: number;
  percentage: number;
  subjectAverages: {
    subject: string;
    average: number;
    maxGrade: number;
    percentage: number;
    count: number;
  }[];
}> => {
  const performances = await getStudentPerformances(studentId);
  
  if (performances.length === 0) {
    return {
      overallAverage: 0,
      totalGrade: 0,
      totalMaxGrade: 0,
      percentage: 0,
      subjectAverages: []
    };
  }
  
  // Calculate the overall average
  const totalGrade = performances.reduce((sum, perf) => sum + perf.grade, 0);
  const totalMaxGrade = performances.reduce((sum, perf) => sum + perf.max_grade, 0);
  const overallAverage = totalGrade / performances.length;
  const percentage = (totalGrade / totalMaxGrade) * 100;
  
  // Calculate averages by subject
  const subjectMap = new Map<string, { totalGrade: number; totalMaxGrade: number; count: number }>();
  
  performances.forEach((performance) => {
    const subject = performance.subject;
    const grade = performance.grade;
    const maxGrade = performance.max_grade;
    
    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, { totalGrade: 0, totalMaxGrade: 0, count: 0 });
    }
    
    const current = subjectMap.get(subject)!;
    subjectMap.set(subject, {
      totalGrade: current.totalGrade + grade,
      totalMaxGrade: current.totalMaxGrade + maxGrade,
      count: current.count + 1,
    });
  });
  
  const subjectAverages = Array.from(subjectMap.entries()).map(([subject, data]) => {
    const average = data.totalGrade / data.count;
    const maxGrade = data.totalMaxGrade / data.count;
    const subjectPercentage = (data.totalGrade / data.totalMaxGrade) * 100;
    
    return {
      subject,
      average,
      maxGrade,
      percentage: subjectPercentage,
      count: data.count,
    };
  });
  
  return {
    overallAverage,
    totalGrade,
    totalMaxGrade,
    percentage,
    subjectAverages
  };
};

// Fonction pour récupérer les données du bulletin de notes
export const getStudentReportCard = async (studentId: string, trimestre: string = "Trimestre 1"): Promise<{
  student: any;
  averageInfo: {
    overallAverage: number;
    totalGrade: number;
    totalMaxGrade: number;
    percentage: number;
    subjectAverages: {
      subject: string;
      average: number;
      maxGrade: number;
      percentage: number;
      count: number;
    }[];
  };
  performances: StudentPerformance[];
  trimestre: string;
}> => {
  // Récupérer les données de l'élève
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*, schools(name)")
    .eq("id", studentId)
    .single();

  if (studentError) {
    console.error("Error fetching student:", studentError);
    throw new Error(studentError.message);
  }

  // Calculer les moyennes
  const averageInfo = await calculateStudentAverage(studentId);
  
  // Récupérer les performances
  const performances = await getStudentPerformances(studentId);

  return {
    student,
    averageInfo,
    performances,
    trimestre
  };
};
