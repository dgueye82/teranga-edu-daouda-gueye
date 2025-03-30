
import React from "react";

const SignatureSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 print:grid-cols-2 print:mt-4">
      <div>
        <p className="font-semibold mb-2">Le Directeur / La Directrice</p>
        <div className="h-16 border-b border-dashed"></div>
      </div>
      <div>
        <p className="font-semibold mb-2">Parent / Tuteur</p>
        <div className="h-16 border-b border-dashed"></div>
      </div>
    </div>
  );
};

export default SignatureSection;
