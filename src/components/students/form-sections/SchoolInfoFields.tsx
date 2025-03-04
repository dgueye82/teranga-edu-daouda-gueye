
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StudentFormData } from "@/types/student";
import { School } from "@/types/school";

interface SchoolInfoFieldsProps {
  form: UseFormReturn<StudentFormData>;
  schools: School[];
}

const SchoolInfoFields: React.FC<SchoolInfoFieldsProps> = ({ form, schools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="school_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>École</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une école" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {schools.map(school => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="enrollment_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date d'inscription</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value || "active"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="graduated">Diplômé</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SchoolInfoFields;
