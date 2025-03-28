
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  delay?: number;
}

const ModuleCard = ({ title, icon: Icon, description, path, delay = 0 }: ModuleCardProps) => {
  return (
    <Link 
      to={path}
      className="module-card group"
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      <div className="mb-4 p-4 bg-teranga-skyBlue rounded-full">
        <Icon className="h-8 w-8 text-teranga-blue" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teranga-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </Link>
  );
};

export default ModuleCard;
