
import React from "react";

const TableErrorState: React.FC = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center text-red-500">
      Une erreur est survenue lors du chargement des élèves.
    </div>
  );
};

export default TableErrorState;
