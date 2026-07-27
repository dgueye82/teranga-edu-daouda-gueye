
export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  gender?: string;
  address?: string;
  email?: string;
  phone?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  enrollment_date?: string;
  status?: string;
  school_id?: string;
  school_name?: string; // Pour l'affichage
  photo_url?: string;
  notes?: string;
  monthly_fee?: number;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  first_name: string;
  last_name: string;
  birth_date?: string;
  gender?: string;
  address?: string;
  email?: string;
  phone?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  enrollment_date?: string;
  status?: string;
  school_id?: string;
  photo_url?: string;
  notes?: string;
  monthly_fee?: number;
}

export type AttendanceReason =
  | 'maladie'
  | 'familial'
  | 'non_justifie'
  | 'transport'
  | 'autre';

export interface StudentAttendance {
  id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  reason?: AttendanceReason | null;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentAttendanceFormData {
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  reason?: AttendanceReason;
  notes?: string;
}

export interface StudentPerformance {
  id: string;
  student_id: string;
  subject: string;
  exam_date: string | null;
  grade: number | null;
  max_grade: number | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentPerformanceFormData {
  student_id: string;
  subject: string;
  exam_date?: string;
  grade?: number;
  max_grade?: number;
  notes?: string;
}
