
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FormFooterButtonsProps {
  onClose: () => void;
  isEditing: boolean;
}

const FormFooterButtons: React.FC<FormFooterButtonsProps> = ({ 
  onClose, 
  isEditing 
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="mr-auto"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>
      <div>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="mr-2"
        >
          Annuler
        </Button>
        <Button type="submit">
          {isEditing ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
};

export default FormFooterButtons;
