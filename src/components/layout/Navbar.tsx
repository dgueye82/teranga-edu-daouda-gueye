
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileMenuToggle from "./navigation/MobileMenuToggle";
import MobileMenu from "./navigation/MobileMenu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
        <DesktopNavigation />

        {/* Mobile Menu Toggle */}
        <MobileMenuToggle 
          isOpen={isMobileMenuOpen} 
          onToggle={toggleMobileMenu} 
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
