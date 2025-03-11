
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { StudentFormData } from "@/types/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdditionalInfoFieldsProps {
  form: UseFormReturn<StudentFormData>;
}

const AdditionalInfoFields: React.FC<AdditionalInfoFieldsProps> = ({ form }) => {
  const [uploading, setUploading] = useState(false);
  const photoUrl = form.watch("photo_url");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      setUploading(true);
      
      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('student-photos')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('student-photos')
        .getPublicUrl(filePath);
        
      // Update the form with the public URL
      form.setValue("photo_url", publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  };

  function getAvatarFallback(formData: StudentFormData) {
    return formData.first_name && formData.last_name 
      ? `${formData.first_name.charAt(0)}${formData.last_name.charAt(0)}`.toUpperCase() 
      : "?";
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo de l'étudiant</FormLabel>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={field.value} alt="Photo de l'étudiant" />
                  <AvatarFallback className="bg-teranga-blue text-white">
                    {getAvatarFallback(form.getValues())}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <FormControl>
                    <div className="flex flex-col">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload">
                        <Button 
                          type="button" 
                          variant="outline" 
                          disabled={uploading}
                          className="mb-2"
                          asChild
                        >
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            {uploading ? "Téléchargement..." : "Télécharger une photo"}
                          </span>
                        </Button>
                      </label>
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => form.setValue("photo_url", "")}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Supprimer la photo
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
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
