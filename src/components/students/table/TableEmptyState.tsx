
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const TableEmptyState: React.FC = () => {
  const { isAdmin } = useAuth();
  
  return (
    <div className="w-full py-10 flex items-center justify-center text-gray-500">
      {isAdmin 
        ? "Aucun élève n'a été trouvé."
        : "Vous n'avez pas encore d'élèves assignés."}
    </div>
  );
};

export default TableEmptyState;
