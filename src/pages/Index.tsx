
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/ui/Hero";
import ModuleCard from "@/components/ui/ModuleCard";
import Sidebar from "@/components/layout/Sidebar";
import { 
  BookOpen, 
  User, 
  Users, 
  Video, 
  FileText, 
  UserCircle,
  Menu,
  ChevronDown 
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const modules = [
    {
      title: "Gérer l'école",
      description: "Système intégré pour la gestion administrative des établissements",
      icon: BookOpen,
      path: "/school-management"
    },
    {
      title: "Gérer l'élève",
      description: "Suivi des parcours, présences et performances des élèves",
      icon: User,
      path: "/student-management"
    },
    {
      title: "Gérer le personnel",
      description: "Gestion efficace des ressources humaines de l'école",
      icon: Users,
      path: "/staff-management"
    },
    {
      title: "Formation en ligne",
      description: "Apprentissage à distance pour les élèves et les enseignants",
      icon: Video,
      path: "/online-training"
    },
    {
      title: "Programme d'études et évaluation",
      description: "Moderniser les méthodes d'enseignement et d'évaluation",
      icon: FileText,
      path: "/curriculum"
    },
    {
      title: "Portails parents",
      description: "Communication et implication des parents dans le parcours scolaire",
      icon: UserCircle,
      path: "/parent-portal"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 transition-all duration-300">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="fixed z-50 bottom-6 left-6 p-3 rounded-full bg-teranga-blue text-white shadow-lg md:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Hero Section */}
          <Hero />
          
          {/* Modules Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Nos Modules
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez les différentes fonctionnalités de notre plateforme pour optimiser 
                  la gestion de votre établissement scolaire.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animate">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    path={module.path}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-20 bg-teranga-background">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2 animate-fade-in">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Comment ça marche
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Notre plateforme TERANGA EDU offre une solution complète pour la gestion numérique 
                    des écoles. Grâce à une interface intuitive et des fonctionnalités adaptées 
                    aux besoins spécifiques du secteur éducatif, nous facilitons la transformation 
                    digitale de votre établissement.
                  </p>
                  <Link to="/how-it-works" className="btn-primary flex items-center w-fit">
                    En savoir plus
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:w-1/2 glass-card rounded-xl overflow-hidden shadow-xl animate-float">
                  <img 
                    src="/lovable-uploads/bdefbc76-5b4e-49c8-b669-87f0b0682e51.png" 
                    alt="Interface TERANGA EDU" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <span className="text-2xl font-bold text-teranga-blue">TERANGA EDU</span>
                  <p className="text-gray-600 mt-2">La solution complète de gestion pour les écoles</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <Link to="/about" className="text-gray-700 hover:text-teranga-blue">
                    À propos
                  </Link>
                  <Link to="/how-it-works" className="text-gray-700 hover:text-teranga-blue">
                    Comment ça marche
                  </Link>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
