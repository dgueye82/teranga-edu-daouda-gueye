
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface PerformancePageErrorProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  backButtonDestination?: string;
}

const PerformancePageError: React.FC<PerformancePageErrorProps> = ({
  title,
  description,
  showBackButton = true,
  backButtonDestination = "/student-management"
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-12 shadow text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
      </div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-500 mb-6">
        {description}
      </p>
      {showBackButton && (
        <Button onClick={() => navigate(backButtonDestination)}>
          Retour à la liste des élèves
        </Button>
      )}
    </div>
  );
};

export default PerformancePageError;
