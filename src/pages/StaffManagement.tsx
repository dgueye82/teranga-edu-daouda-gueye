
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, UserCog, ClipboardList, Calendar, Award, BarChart } from "lucide-react";

const StaffManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const features = [
    {
      title: "Gestion des profils",
      description: "Administration des profils du personnel enseignant et administratif",
      icon: UserCog
    },
    {
      title: "Suivi des tâches",
      description: "Attribution et suivi des responsabilités et des tâches",
      icon: ClipboardList
    },
    {
      title: "Emplois du temps",
      description: "Gestion des horaires et des disponibilités du personnel",
      icon: Calendar
    },
    {
      title: "Évaluation des performances",
      description: "Outils d'évaluation et de développement professionnel",
      icon: Award
    },
    {
      title: "Rapports et statistiques",
      description: "Analyses des données pour optimiser la gestion des ressources humaines",
      icon: BarChart
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
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Gérer le personnel</h1>
                <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
                <p className="text-lg text-gray-700">
                  Notre module de gestion du personnel vous permet d'optimiser la gestion 
                  des ressources humaines de votre établissement. Valorisez votre équipe 
                  et améliorez l'efficacité collective.
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
                  Optimiser la gestion des ressources humaines
                </h2>
                <p className="text-gray-700 mb-4">
                  Une gestion efficace du personnel permet de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Simplifier les processus administratifs liés au personnel</li>
                  <li>Améliorer la répartition des tâches et des responsabilités</li>
                  <li>Faciliter le développement professionnel</li>
                  <li>Renforcer la cohésion d'équipe</li>
                  <li>Valoriser les compétences et l'engagement de chacun</li>
                </ul>
                <p className="text-gray-700">
                  Avec Teranga EDU, la gestion du personnel devient un levier de performance pour votre établissement.
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

export default StaffManagement;
