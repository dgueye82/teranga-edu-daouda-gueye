
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
