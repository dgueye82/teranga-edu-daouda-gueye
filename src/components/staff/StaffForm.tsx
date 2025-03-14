
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { StaffFormData } from "@/types/staff";
import PersonalInfoFields from "./form-sections/PersonalInfoFields";
import EmploymentInfoFields from "./form-sections/EmploymentInfoFields";
import ContactInfoFields from "./form-sections/ContactInfoFields";
import { FormFooterButtons } from "@/components/students/form-sections/FormFooterButtons";

const staffFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "La fonction est requise"),
  department: z.string().min(2, "Le département est requis"),
  joinDate: z.string().min(1, "La date d'entrée est requise"),
  status: z.string().min(1, "Le statut est requis"),
  email: z.string().email("Adresse email invalide").or(z.string().length(0)),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StaffFormValues) => void;
  staffMember?: {
    id: string;
    name: string;
    role: string;
    department: string;
    joinDate: string;
    status: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

const StaffForm: React.FC<StaffFormProps> = ({ isOpen, onClose, onSubmit, staffMember }) => {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: staffMember || {
      name: "",
      role: "",
      department: "",
      joinDate: "",
      status: "Actif",
      email: "",
      phone: "",
      address: ""
    }
  });

  const handleSubmit = (data: StaffFormValues) => {
    onSubmit(data);
    onClose();
  };

  const isEditing = !!staffMember;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier le membre du personnel" : "Ajouter un membre du personnel"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <PersonalInfoFields form={form} />
            <EmploymentInfoFields form={form} />
            <ContactInfoFields form={form} />
            <FormFooterButtons onClose={onClose} isEditing={isEditing} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffForm;
