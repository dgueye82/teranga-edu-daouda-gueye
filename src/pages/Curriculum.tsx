
import Navbar from "@/components/layout/Navbar";
import { BookOpen, FileText, LucideBarChart2, PenTool, CheckSquare } from "lucide-react";

const Curriculum = () => {
  const features = [
    {
      title: "Programmes d'études",
      description: "Gestion et personnalisation des programmes par niveau et matière",
      icon: BookOpen
    },
    {
      title: "Ressources pédagogiques",
      description: "Création et partage de contenus pédagogiques numériques",
      icon: FileText
    },
    {
      title: "Suivi des progressions",
      description: "Outils de suivi de l'avancement dans les programmes",
      icon: LucideBarChart2
    },
    {
      title: "Création d'évaluations",
      description: "Conception et programmation des évaluations et examens",
      icon: PenTool
    },
    {
      title: "Analyse des résultats",
      description: "Analyse détaillée des résultats d'évaluations par compétences",
      icon: CheckSquare
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-teranga-background transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">Programme d'études et évaluation</h1>
              <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
              <p className="text-lg text-gray-700">
                Notre module de gestion des programmes d'études et d'évaluation vous permet de 
                moderniser vos méthodes d'enseignement et d'évaluation. Utilisez des outils 
                numériques adaptés pour enrichir l'expérience pédagogique.
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
                Innovation pédagogique et évaluation
              </h2>
              <p className="text-gray-700 mb-4">
                La numérisation du programme d'études et du système d'évaluation permet de:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Adapter les contenus pédagogiques aux besoins spécifiques des élèves</li>
                <li>Diversifier les méthodes d'évaluation pour mieux valoriser les compétences</li>
                <li>Faciliter le suivi des acquisitions et la remédiation</li>
                <li>Impliquer davantage les élèves dans leur processus d'apprentissage</li>
                <li>Améliorer la cohérence entre les programmes et les évaluations</li>
              </ul>
              <p className="text-gray-700">
                Avec Teranga EDU, l'enseignement et l'évaluation deviennent plus personnalisés et plus efficaces.
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
  );
};

export default Curriculum;
