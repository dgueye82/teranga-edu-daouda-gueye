
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormFooterProps {
  isSubmitting: boolean;
  onCancel: () => void;
  mode: "create" | "edit";
}

const FormFooter: React.FC<FormFooterProps> = ({ isSubmitting, onCancel, mode }) => {
  return (
    <DialogFooter>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Annuler
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-orange-500 hover:bg-orange-600"
      >
        {isSubmitting ? "Enregistrement..." : mode === "create" ? "Enregistrer" : "Mettre à jour"}
      </Button>
    </DialogFooter>
  );
};

export default FormFooter;
