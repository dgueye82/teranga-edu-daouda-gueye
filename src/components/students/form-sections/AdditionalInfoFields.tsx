
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { StudentFormData } from "@/types/student";

interface AdditionalInfoFieldsProps {
  form: UseFormReturn<StudentFormData>;
}

const AdditionalInfoFields: React.FC<AdditionalInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la photo</FormLabel>
              <FormControl>
                <Input placeholder="URL de la photo de l'étudiant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes additionnelles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AdditionalInfoFields;
