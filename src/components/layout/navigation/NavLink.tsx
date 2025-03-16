
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "button";
  exact?: boolean;
}

const NavLink = ({ 
  to, 
  children, 
  onClick, 
  className, 
  variant = "default",
  exact = false
}: NavLinkProps) => {
  // Ensure the path is properly formatted
  const formattedPath = to.startsWith("/") ? to : `/${to}`;
  
  if (variant === "button") {
    return (
      <RouterNavLink
        to={formattedPath}
        className={({ isActive }) =>
          `${className || ""} px-4 py-2 rounded-md transition-colors ${
            isActive 
              ? "bg-teranga-blue text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`
        }
        onClick={onClick}
        end={exact}
      >
        {children}
      </RouterNavLink>
    );
  }

  return (
    <RouterNavLink
      to={formattedPath}
      className={({ isActive }) =>
        `${className || ""} text-sm font-medium transition-colors hover:text-teranga-blue ${
          isActive ? "text-teranga-blue" : "text-gray-700"
        }`
      }
      onClick={onClick}
      end={exact}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
