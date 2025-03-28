
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

const ModuleCard = ({ title, icon, description, linkTo, path, delay = 0 }: ModuleCardProps) => {
  // Utiliser linkTo ou path (pour assurer la rétrocompatibilité)
  const linkPath = linkTo || path || "/";
  
  return (
    <Link 
      to={linkPath}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center animate-fade-in"
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      <div className="mb-4 p-4 bg-teranga-skyBlue rounded-full">
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
