
import React from "react";

const TableLoadingState: React.FC = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
};

export default TableLoadingState;
