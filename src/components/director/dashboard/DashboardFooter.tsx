
import React from "react";

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
        <p className="mt-1 text-sm">Tableau de Bord du Directeur v1.0</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
