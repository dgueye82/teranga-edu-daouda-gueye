
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ to, children, onClick, className }: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `${className || ""} text-sm font-medium transition-colors hover:text-teranga-blue ${
          isActive ? "text-teranga-blue" : "text-gray-700"
        }`
      }
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
