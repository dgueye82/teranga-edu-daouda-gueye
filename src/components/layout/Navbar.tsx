
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import UserMenuButton from './UserMenuButton';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileMenu from './navigation/MobileMenu';
import MobileMenuToggle from './navigation/MobileMenuToggle';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isAuthenticated = !!user;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/how-it-works', label: 'Comment ça marche' },
    { href: '/online-training', label: 'Formation en ligne' },
    { href: '/parent-portal', label: 'Portail Parents' },
    { href: '/student-management', label: 'Gestion des élèves' },
    { href: '/school-management', label: 'Gestion des écoles' },
    { href: '/staff-management', label: 'Gestion du personnel' },
  ];

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/4e73e45e-0576-481c-9188-001a368a7ec4.png"
                alt="TerangaEDU Logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">TerangaEDU</span>
            </Link>
          </div>

          {!isMobile ? (
            <DesktopNavigation links={links} />
          ) : (
            <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
          )}

          <div className="flex items-center">
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/" className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Se connecter
                </Link>
                <Link to="/" className="text-sm font-medium px-4 py-2 bg-teranga-blue text-white rounded-md hover:bg-blue-600">
                  S'inscrire
                </Link>
              </div>
            ) : (
              <UserMenuButton user={user} signOut={signOut} />
            )}
          </div>
        </div>
      </div>

      {isMobile && <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMenu} links={links} />}
    </header>
  );
};

export default Navbar;
