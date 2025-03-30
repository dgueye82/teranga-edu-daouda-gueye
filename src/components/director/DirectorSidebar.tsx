
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  School,
  FileText,
  Calendar,
  DollarSign,
  BoxesIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart,
  BookOpen,
  ClipboardList,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DirectorSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarLinks = [
    {
      title: "Tableau de Bord",
      path: "/director-dashboard",
      icon: <BarChart className="h-5 w-5" />
    },
    {
      title: "Personnel",
      path: "/director/staff",
      icon: <Users className="h-5 w-5" />,
      children: [
        {
          title: "Enseignants",
          path: "/director/teachers",
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: "Personnel Administratif",
          path: "/director/admin-staff",
          icon: <Users className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Élèves",
      path: "/director/students",
      icon: <School className="h-5 w-5" />,
      children: [
        {
          title: "Par Classe",
          path: "/director/classes",
          icon: <Users className="h-4 w-4" />
        },
        {
          title: "Dossiers Scolaires",
          path: "/director/student-records",
          icon: <ClipboardList className="h-4 w-4" />
        },
        {
          title: "Discipline",
          path: "/director/discipline",
          icon: <MessageSquare className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Évaluations",
      path: "/director/reports",
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Calendrier",
      path: "/director/calendar",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Finances",
      path: "/director/finance",
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Inventaire",
      path: "/director/inventory",
      icon: <BoxesIcon className="h-5 w-5" />
    },
    {
      title: "Paramètres",
      path: "/director/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen fixed top-0 left-0 pt-16 z-10 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <h2 className="font-semibold text-lg">Menu Directeur</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="ml-auto p-1"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <React.Fragment key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
                    isActive && "bg-gray-100 text-gray-900 font-medium",
                    collapsed && "justify-center"
                  )
                }
              >
                <span className={collapsed ? "" : "mr-3"}>{link.icon}</span>
                {!collapsed && <span>{link.title}</span>}
              </NavLink>
              
              {!collapsed && link.children && link.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 pl-10 pr-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm",
                      isActive && "bg-gray-100 text-gray-900 font-medium"
                    )
                  }
                >
                  <span className="mr-2">{child.icon}</span>
                  <span>{child.title}</span>
                </NavLink>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <Separator className="my-4" />
        
        <div className="mt-auto">
          {!collapsed && (
            <div className="text-xs text-gray-500 mb-2">
              TERANGA EDU - Panel Directeur
            </div>
          )}
          <NavLink
            to="/help"
            className={cn(
              "flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
              collapsed && "justify-center"
            )}
          >
            <span className={collapsed ? "" : "mr-3"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                />
              </svg>
            </span>
            {!collapsed && <span>Aide</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default DirectorSidebar;
