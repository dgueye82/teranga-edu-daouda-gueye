
export type StaffRole = 
  | "Enseignant" 
  | "Directeur" 
  | "Directrice Adjointe" 
  | "Conseiller Pédagogique" 
  | "Conseillère Pédagogique" 
  | "Administrateur" 
  | "Technicien" 
  | "Personnel d'Entretien";

export type Department = 
  | "Administration" 
  | "Mathématiques" 
  | "Sciences" 
  | "Lettres" 
  | "Langues" 
  | "Histoire-Géographie" 
  | "Education Physique" 
  | "Informatique" 
  | "Orientation" 
  | "Support Technique";

export type StaffStatus = "Actif" | "Congé" | "Suspendu" | "Retraité";

export interface Staff {
  id: string;
  name: string;
  role: StaffRole | string;
  department: Department | string;
  joinDate: string;
  status: StaffStatus | string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
}

export interface StaffFormData {
  name: string;
  role: StaffRole | string;
  department: Department | string;
  joinDate: string;
  status: StaffStatus | string;
  email?: string;
  phone?: string;
  address?: string;
}
