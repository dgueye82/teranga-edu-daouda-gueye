
import NavLink from "./NavLink";
import UserMenuButton from "../UserMenuButton";

const DesktopNavigation = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <NavLink to="/about">
        À propos
      </NavLink>
      <NavLink to="/school-management">
        Gérer l'école
      </NavLink>
      <NavLink to="/student-management">
        Gérer l'élève
      </NavLink>
      <NavLink to="/staff-management">
        Gérer le personnel
      </NavLink>
      <NavLink to="/online-training">
        Formation en ligne
      </NavLink>
      <NavLink to="/curriculum">
        Programme d'études et évaluation
      </NavLink>
      <NavLink to="/parent-portal">
        Portails parents
      </NavLink>
      
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
