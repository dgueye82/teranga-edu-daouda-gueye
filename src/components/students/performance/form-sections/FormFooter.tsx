
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";

interface FormFooterProps {
  isSubmitting: boolean;
  onCancel: () => void;
  mode: "create" | "edit";
}

const FormFooter: React.FC<FormFooterProps> = ({ isSubmitting, onCancel, mode }) => {
  return (
    <DialogFooter className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
        className="mr-auto"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>
      <div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
          className="mr-2"
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
      </div>
    </DialogFooter>
  );
};

export default FormFooter;
