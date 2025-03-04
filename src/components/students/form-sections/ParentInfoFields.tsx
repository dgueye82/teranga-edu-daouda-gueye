
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentFormData } from "@/types/student";

interface ParentInfoFieldsProps {
  form: UseFormReturn<StudentFormData>;
}

const ParentInfoFields: React.FC<ParentInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="parent_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du parent/tuteur</FormLabel>
            <FormControl>
              <Input placeholder="Nom du parent" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="parent_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone du parent</FormLabel>
            <FormControl>
              <Input placeholder="Téléphone du parent" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="parent_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email du parent</FormLabel>
            <FormControl>
              <Input placeholder="Email du parent" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ParentInfoFields;
