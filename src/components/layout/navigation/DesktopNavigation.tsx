
import { Link } from "react-router-dom";

interface DesktopNavigationProps {
  links?: { href: string; label: string }[];
}

const DesktopNavigation = ({ links = [] }: DesktopNavigationProps) => {
  const defaultLinks = [
    { href: "/about", label: "À propos" },
    { href: "/school-management", label: "Gérer l'école" },
    { href: "/staff-management", label: "Gérer le personnel" },
    { href: "/student-management", label: "Gérer l'élève" },
    { href: "/online-training", label: "Formation en ligne" },
    { href: "/curriculum", label: "Programme d'études et évaluation" },
    { href: "/parent-portal", label: "Portails parents" },
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {displayLinks.map((link) => (
        <Link 
          key={link.href}
          to={link.href} 
          className="text-sm font-medium transition-colors hover:text-teranga-blue text-gray-700"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
