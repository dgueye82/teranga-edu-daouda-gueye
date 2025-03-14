
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { StudentFormData } from "@/types/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadSectionProps {
  form: UseFormReturn<StudentFormData>;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ form }) => {
  const [uploading, setUploading] = useState(false);
  const photoUrl = form.watch("photo_url");

  React.useEffect(() => {
    if (!photoUrl) {
      const genericPhotos = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=300"
      ];
      
      const randomPhoto = genericPhotos[Math.floor(Math.random() * genericPhotos.length)];
      form.setValue("photo_url", randomPhoto);
    }
  }, [photoUrl, form]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      setUploading(true);
      
      const { error: uploadError, data } = await supabase.storage
        .from('student-photos')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('student-photos')
        .getPublicUrl(filePath);
        
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
    <div className="flex justify-center mb-6">
      <div className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-2 border-2 border-gray-200">
          <AvatarImage src={photoUrl} alt="Photo de l'étudiant" />
          <AvatarFallback className="bg-teranga-blue text-white text-lg">
            {getAvatarFallback(form.getValues())}
          </AvatarFallback>
        </Avatar>
        <div>
          <input 
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
              size="sm"
              disabled={uploading}
              className="mb-1"
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Téléchargement..." : "Changer la photo"}
            </Button>
          </label>
        </div>
        <input 
          type="hidden" 
          {...form.register("photo_url")} 
        />
      </div>
    </div>
  );
};

export default PhotoUploadSection;
