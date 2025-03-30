
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="text-center text-xs text-gray-500 pt-6 print:pt-2">
      <p>Document généré le {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default Footer;
