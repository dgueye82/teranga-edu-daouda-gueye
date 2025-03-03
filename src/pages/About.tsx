
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, CheckCircle } from "lucide-react";

const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const objectives = [
    "Digitalisation de la gestion scolaire : Mettre en place un système intégré pour la gestion administrative des établissements.",
    "Gestion numérique des élèves : Créer une plateforme pour suivre les parcours, les présences et les performances des élèves.",
    "Gestion du personnel enseignant et administratif : Développer un outil pour gérer efficacement les ressources humaines de l'école.",
    "Implémentation d'une plateforme de formation en ligne : Offrir des opportunités d'apprentissage à distance pour les élèves et les enseignants.",
    "Numérisation du programme d'études et du système d'évaluation : Moderniser les méthodes d'enseignement et d'évaluation grâce aux outils numériques.",
    "Création d'un portail parents : Faciliter la communication et l'implication des parents dans le parcours scolaire de leurs enfants."
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
                <h1 className="text-4xl font-bold text-gray-800 mb-6">À propos</h1>
                <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
                <p className="text-lg text-gray-700 mb-6">
                  TERANGA EDU est une plateforme de gestion centralisée des écoles, conçue pour moderniser 
                  et optimiser tous les aspects de l'administration scolaire. Notre solution répond aux 
                  besoins spécifiques des établissements éducatifs en Afrique et ailleurs, en offrant 
                  une suite complète d'outils numériques adaptés au contexte local.
                </p>
                <p className="text-lg text-gray-700">
                  Notre objectif est de faciliter la transition numérique du secteur éducatif, 
                  en améliorant l'efficacité administrative, la qualité de l'enseignement et 
                  l'expérience globale pour tous les acteurs impliqués.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Objectifs du projet
                </h2>
                <div className="space-y-4">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-teranga-blue shrink-0 mt-0.5" />
                      <p className="text-gray-700">{objective}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-700">
                  Ces objectifs visent à moderniser et optimiser la gestion des écoles, à améliorer 
                  la qualité de l'enseignement et à renforcer l'engagement de toutes les parties 
                  impliquées dans le processus éducatif.
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

export default About;
