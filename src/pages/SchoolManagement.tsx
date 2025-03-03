
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, School, Settings, FileText, Users, Calendar } from "lucide-react";

const SchoolManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const features = [
    {
      title: "Gestion des établissements",
      description: "Gérez les données de base et la structure de vos établissements scolaires",
      icon: School
    },
    {
      title: "Administration",
      description: "Outils de gestion administrative pour le fonctionnement quotidien",
      icon: Settings
    },
    {
      title: "Documents administratifs",
      description: "Génération et gestion des documents officiels et rapports",
      icon: FileText
    },
    {
      title: "Gestion des classes",
      description: "Organisation et suivi des classes et des groupes d'élèves",
      icon: Users
    },
    {
      title: "Calendrier scolaire",
      description: "Planification de l'année scolaire, événements et congés",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed z-50 bottom-6 left-6 p-3 rounded-full bg-teranga-blue text-white shadow-lg md:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <main className="flex-1 bg-teranga-background transition-all duration-300">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 animate-fade-in">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Gérer l'école</h1>
                <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
                <p className="text-lg text-gray-700">
                  Notre module de gestion d'école vous permet de digitaliser et d'optimiser 
                  l'administration de votre établissement scolaire. Centralisez toutes vos 
                  données administratives et gagnez en efficacité.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 stagger-animate">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teranga-skyBlue rounded-lg">
                          <Icon className="h-6 w-6 text-teranga-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Digitaliser la gestion administrative
                </h2>
                <p className="text-gray-700 mb-4">
                  La transition vers une gestion numérique de votre établissement vous permet de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Réduire les tâches administratives manuelles</li>
                  <li>Centraliser et sécuriser vos données</li>
                  <li>Faciliter la communication interne et externe</li>
                  <li>Générer des rapports détaillés sur le fonctionnement de votre établissement</li>
                  <li>Optimiser les ressources humaines et matérielles</li>
                </ul>
                <p className="text-gray-700">
                  Avec Teranga EDU, la gestion administrative devient plus simple, plus rapide et plus efficace.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-white py-8 border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default SchoolManagement;
