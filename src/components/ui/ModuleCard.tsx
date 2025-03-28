
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo?: string;
  path?: string;
  delay?: number;
}

const ModuleCard = ({ title, icon, description, linkTo, path }: ModuleCardProps) => {
  // Utiliser linkTo ou path (pour assurer la rétrocompatibilité)
  const linkPath = linkTo || path || "/";
  
  return (
    <Link 
      to={linkPath}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center h-full"
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-teranga-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </Link>
  );
};

export default ModuleCard;
