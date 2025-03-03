
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const steps = [
    {
      title: "Intégration",
      description: "Configurez rapidement votre établissement dans la plateforme Teranga EDU avec vos données spécifiques."
    },
    {
      title: "Gestion des utilisateurs",
      description: "Créez des comptes pour le personnel administratif, les enseignants, les élèves et les parents."
    },
    {
      title: "Formation",
      description: "Profitez de nos sessions de formation pour maîtriser toutes les fonctionnalités de la plateforme."
    },
    {
      title: "Utilisation quotidienne",
      description: "Intégrez la plateforme dans vos processus quotidiens pour une gestion optimale de votre établissement."
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
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Comment ça marche</h1>
                <p className="text-xl text-gray-600">
                  Découvrez comment Teranga EDU peut transformer la gestion de votre établissement scolaire
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg mb-12 animate-fade-in-up">
                <ol className="relative border-l border-teranga-lightBlue">
                  {steps.map((step, index) => (
                    <li key={index} className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-teranga-blue rounded-full -left-4 ring-4 ring-white">
                        <span className="text-white font-bold">{index + 1}</span>
                      </span>
                      <h3 className="flex items-center mb-2 text-xl font-semibold text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-teranga-blue text-white rounded-xl p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-4">Prêt à commencer?</h2>
                <p className="mb-6">
                  Transformez la gestion de votre établissement scolaire avec Teranga EDU. 
                  Notre équipe est prête à vous accompagner dans cette transition numérique.
                </p>
                <button className="bg-white text-teranga-blue py-2 px-6 rounded-full font-medium hover:bg-teranga-skyBlue transition-colors duration-300 flex items-center">
                  Contacter notre équipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
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

export default HowItWorks;
