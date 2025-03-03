
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, Play, Book, MessageSquare, FileText, Monitor } from "lucide-react";

const OnlineTraining = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const features = [
    {
      title: "Cours en ligne",
      description: "Accès à des leçons interactives avec supports multimédias",
      icon: Play
    },
    {
      title: "Ressources pédagogiques",
      description: "Bibliothèque de matériels pédagogiques et documents de référence",
      icon: Book
    },
    {
      title: "Forums d'échanges",
      description: "Espaces de discussion et d'entraide entre élèves et enseignants",
      icon: MessageSquare
    },
    {
      title: "Devoirs et exercices",
      description: "Système de création et de suivi des exercices et devoirs",
      icon: FileText
    },
    {
      title: "Classes virtuelles",
      description: "Organisation de sessions d'apprentissage en direct",
      icon: Monitor
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
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Formation en ligne</h1>
                <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
                <p className="text-lg text-gray-700">
                  Notre plateforme de formation en ligne offre des opportunités d'apprentissage 
                  flexibles et accessibles pour les élèves et les enseignants. Développez 
                  les compétences numériques et enrichissez l'expérience pédagogique.
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
                  Les avantages de la formation en ligne
                </h2>
                <p className="text-gray-700 mb-4">
                  L'intégration de la formation en ligne offre de nombreux avantages:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Flexibilité dans le rythme et le lieu d'apprentissage</li>
                  <li>Contenu pédagogique enrichi par des ressources multimédias</li>
                  <li>Possibilité de revoir les cours autant que nécessaire</li>
                  <li>Développement de l'autonomie et des compétences numériques</li>
                  <li>Continuité pédagogique assurée en toutes circonstances</li>
                </ul>
                <p className="text-gray-700">
                  Avec Teranga EDU, l'apprentissage se poursuit au-delà des murs de l'école.
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

export default OnlineTraining;
