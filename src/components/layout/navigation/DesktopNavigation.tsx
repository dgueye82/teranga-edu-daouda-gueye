import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Permission } from "@/lib/permissions";

interface NavItem {
  to: string;
  label: string;
  permission?: Permission;
}

const items: NavItem[] = [
  { to: "/about", label: "À propos" },
  { to: "/school-management", label: "Gérer l'école", permission: "schools.view" },
  { to: "/staff-management", label: "Gérer le personnel", permission: "staff.view" },
  { to: "/student-management", label: "Gérer l'élève", permission: "students.view" },
  { to: "/online-training", label: "Formation en ligne" },
  { to: "/curriculum", label: "Programme d'études et évaluation" },
  { to: "/parent-portal", label: "Portails parents" },
];

const DesktopNavigation = () => {
  const { hasPermission } = useAuth();

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {items
        .filter((item) => !item.permission || hasPermission(item.permission))
        .map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
};

export default DesktopNavigation;
