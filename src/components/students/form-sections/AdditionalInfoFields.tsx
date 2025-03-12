
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
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

  // Generate generic photo URL if none exists
  React.useEffect(() => {
    if (!photoUrl) {
      // Array of generic student photos
      const genericPhotos = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=300"
      ];
      
      // Select a random photo
      const randomPhoto = genericPhotos[Math.floor(Math.random() * genericPhotos.length)];
      form.setValue("photo_url", randomPhoto);
    }
  }, []);

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

