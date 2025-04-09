
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileMenuToggle from "./navigation/MobileMenuToggle";
import MobileMenu from "./navigation/MobileMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userProfile } = useAuth();

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
          
          {/* Login status indicator with more visibility */}
          {user && (
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-green-300 flex items-center gap-1 px-3 py-1">
              <UserRound className="h-3 w-3 text-green-600" />
              <span className="font-medium">{userProfile?.first_name || "Connecté"}</span>
            </Badge>
          )}
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
