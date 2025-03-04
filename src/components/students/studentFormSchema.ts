
import { z } from "zod";

export const studentSchema = z.object({
  first_name: z.string().min(1, "Le prénom est obligatoire"),
  last_name: z.string().min(1, "Le nom est obligatoire"),
  birth_date: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().optional(),
  parent_name: z.string().optional(),
  parent_phone: z.string().optional(),
  parent_email: z.string().email("Email invalide").optional().or(z.literal("")),
  enrollment_date: z.string().optional(),
  status: z.string().optional(),
  school_id: z.string().optional(),
  photo_url: z.string().optional(),
  notes: z.string().optional(),
});

export type StudentFormSchema = z.infer<typeof studentSchema>;
