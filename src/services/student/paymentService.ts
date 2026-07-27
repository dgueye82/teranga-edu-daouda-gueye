import { supabase } from "@/integrations/supabase/client";

export interface StudentPayment {
  id: string;
  student_id: string;
  month: number;
  year: number;
  amount: number;
  payment_date: string;
  method?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentPaymentFormData {
  student_id: string;
  month: number;
  year: number;
  amount: number;
  payment_date?: string;
  method?: string;
  notes?: string;
}

export const getPaymentsForYear = async (year: number): Promise<StudentPayment[]> => {
  const { data, error } = await (supabase as any)
    .from("student_payments")
    .select("*")
    .eq("year", year);
  if (error) throw new Error(error.message);
  return (data || []) as StudentPayment[];
};

export const getPaymentsByStudent = async (studentId: string): Promise<StudentPayment[]> => {
  const { data, error } = await (supabase as any)
    .from("student_payments")
    .select("*")
    .eq("student_id", studentId)
    .order("year", { ascending: false })
    .order("month", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []) as StudentPayment[];
};

export const createPayment = async (payment: StudentPaymentFormData): Promise<StudentPayment> => {
  const { data, error } = await (supabase as any)
    .from("student_payments")
    .insert([payment])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as StudentPayment;
};

export const deletePayment = async (id: string): Promise<void> => {
  const { error } = await (supabase as any).from("student_payments").delete().eq("id", id);
  if (error) throw new Error(error.message);
};
