
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ClassHeaderProps {
  title: string;
  description: string;
  backLink: string;
}

const ClassHeader = ({ title, description, backLink }: ClassHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(backLink)}
        className="mr-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ClassHeader;
