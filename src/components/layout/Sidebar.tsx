
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Ferme automatiquement la barre latérale lors d'un changement de route
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // If sidebar should be hidden, return null
  if (!isOpen && window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={onClose}>
      <aside
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white transition-transform duration-300 ease-in-out transform 
          translate-x-0 md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-teranga-blue">TERANGA EDU</span>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/how-it-works"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-teranga-skyBlue text-teranga-blue"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={onClose}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Comment ça marche
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
