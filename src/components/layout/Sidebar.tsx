
import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  User, 
  Video, 
  FileText, 
  Users as UsersIcon,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-white">TERANGA EDU</span>
          <button
            onClick={onClose}
            className="p-1 text-white rounded-full hover:bg-teranga-lightBlue/20 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <BookOpen className="h-5 w-5 mr-3" />
                À propos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/school-management"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Gérer l'école
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student-management"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <User className="h-5 w-5 mr-3" />
                Gérer l'élève
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/online-training"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <Video className="h-5 w-5 mr-3" />
                Formation en ligne
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/curriculum"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <FileText className="h-5 w-5 mr-3" />
                Programme d'études et évaluation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/parent-portal"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <UsersIcon className="h-5 w-5 mr-3" />
                Portails parents
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-teranga-blue"
                      : "text-white hover:bg-teranga-lightBlue/20"
                  }`
                }
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Comment ça marche
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
