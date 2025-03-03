
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserMenuButton from "./UserMenuButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold text-teranga-blue">
            TERANGA EDU
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            À propos
          </NavLink>
          <NavLink
            to="/school-management"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Gérer l'école
          </NavLink>
          <NavLink
            to="/student-management"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Gérer l'élève
          </NavLink>
          <NavLink
            to="/staff-management"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Gérer le personnel
          </NavLink>
          <NavLink
            to="/online-training"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Formation en ligne
          </NavLink>
          <NavLink
            to="/curriculum"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Programme d'études et évaluation
          </NavLink>
          <NavLink
            to="/parent-portal"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-teranga-blue ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
          >
            Portails parents
          </NavLink>
          
          <UserMenuButton />
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <UserMenuButton />
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-teranga-blue focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 lg:hidden bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6 overflow-y-auto">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </NavLink>
          <NavLink
            to="/school-management"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gérer l'école
          </NavLink>
          <NavLink
            to="/student-management"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gérer l'élève
          </NavLink>
          <NavLink
            to="/staff-management"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gérer le personnel
          </NavLink>
          <NavLink
            to="/online-training"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Formation en ligne
          </NavLink>
          <NavLink
            to="/curriculum"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programme d'études et évaluation
          </NavLink>
          <NavLink
            to="/parent-portal"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portails parents
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `py-2 text-lg font-medium border-b border-gray-100 ${
                isActive ? "text-teranga-blue" : "text-gray-700"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Comment ça marche
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
