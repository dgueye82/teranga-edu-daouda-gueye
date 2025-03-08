
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StaffListTab from "@/components/staff/StaffListTab";

const StaffList = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-teranga-background transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Liste du Personnel</h1>
            <p className="text-gray-600 mt-2">
              Gérez les membres du personnel de votre établissement
            </p>
          </div>
          
          <StaffListTab />
        </div>
        
        {/* Footer */}
        <footer className="bg-white py-8 border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default StaffList;
