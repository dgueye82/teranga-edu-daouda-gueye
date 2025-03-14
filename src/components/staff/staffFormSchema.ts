
import { z } from "zod";
import { StaffFormData } from "@/types/staff";

export const staffFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "La fonction est requise"),
  department: z.string().min(2, "Le département est requis"),
  joinDate: z.string().min(1, "La date d'entrée est requise"),
  status: z.string().min(1, "Le statut est requis"),
  email: z.string().email("Adresse email invalide").or(z.string().length(0)),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

export const getDefaultValues = (staffMember?: Partial<StaffFormData>): StaffFormValues => {
  return {
    name: staffMember?.name || "",
    role: staffMember?.role || "",
    department: staffMember?.department || "",
    joinDate: staffMember?.joinDate || "",
    status: staffMember?.status || "Actif",
    email: staffMember?.email || "",
    phone: staffMember?.phone || "",
    address: staffMember?.address || ""
  };
};
