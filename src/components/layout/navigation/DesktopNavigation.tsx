
import NavLink from "./NavLink";
import UserMenuButton from "../UserMenuButton";

const DesktopNavigation = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <NavLink to="/about" exact>
        À propos
      </NavLink>
      <NavLink to="/school-management" exact>
        Gérer l'école
      </NavLink>
      <NavLink to="/student-management" exact>
        Gérer l'élève
      </NavLink>
      <NavLink to="/staff-management" exact>
        Gérer le personnel
      </NavLink>
      <NavLink to="/online-training" exact>
        Formation en ligne
      </NavLink>
      <NavLink to="/curriculum" exact>
        Programme d'études et évaluation
      </NavLink>
      <NavLink to="/parent-portal" exact>
        Portails parents
      </NavLink>
      
      <UserMenuButton />
    </nav>
  );
};

export default DesktopNavigation;
