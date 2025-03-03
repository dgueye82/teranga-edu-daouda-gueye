
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, MessageCircle, Calendar, FileBarChart, BookOpen, Bell } from "lucide-react";

const ParentPortal = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const features = [
    {
      title: "Communication directe",
      description: "Messagerie sécurisée entre parents et personnel éducatif",
      icon: MessageCircle
    },
    {
      title: "Calendrier des événements",
      description: "Agenda des activités scolaires et rendez-vous importants",
      icon: Calendar
    },
    {
      title: "Suivi des résultats",
      description: "Accès aux évaluations et bulletins scolaires",
      icon: FileBarChart
    },
    {
      title: "Ressources pédagogiques",
      description: "Accès aux supports de cours et ressources complémentaires",
      icon: BookOpen
    },
    {
      title: "Notifications personnalisées",
      description: "Alertes sur les informations importantes concernant l'élève",
      icon: Bell
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
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Portails parents</h1>
                <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
                <p className="text-lg text-gray-700">
                  Notre portail parents facilite la communication et l'implication des parents 
                  dans le parcours scolaire de leurs enfants. Renforcez le lien entre l'école 
                  et les familles pour une éducation plus cohérente.
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
                  L'importance de l'implication des parents
                </h2>
                <p className="text-gray-700 mb-4">
                  Un portail dédié aux parents permet de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Renforcer la collaboration entre l'école et les familles</li>
                  <li>Impliquer davantage les parents dans la scolarité de leurs enfants</li>
                  <li>Faciliter le suivi des progrès et des difficultés</li>
                  <li>Améliorer la communication sur les projets éducatifs</li>
                  <li>Créer une communauté éducative plus soudée</li>
                </ul>
                <p className="text-gray-700">
                  Avec Teranga EDU, les parents deviennent des partenaires actifs dans la réussite scolaire de leurs enfants.
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

export default ParentPortal;
