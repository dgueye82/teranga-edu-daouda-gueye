
import Navbar from "@/components/layout/Navbar";
import { MessageCircle, Calendar, FileBarChart, BookOpen, Bell } from "lucide-react";
import ModuleCard from "@/components/ui/ModuleCard";

const ParentPortal = () => {
  const features = [
    {
      title: "Communication directe",
      description: "Messagerie sécurisée entre parents et personnel éducatif",
      icon: <MessageCircle className="h-10 w-10 text-teranga-blue" />
    },
    {
      title: "Calendrier des événements",
      description: "Agenda des activités scolaires et rendez-vous importants",
      icon: <Calendar className="h-10 w-10 text-teranga-blue" />
    },
    {
      title: "Suivi des résultats",
      description: "Accès aux évaluations et bulletins scolaires",
      icon: <FileBarChart className="h-10 w-10 text-teranga-blue" />
    },
    {
      title: "Ressources pédagogiques",
      description: "Accès aux supports de cours et ressources complémentaires",
      icon: <BookOpen className="h-10 w-10 text-teranga-blue" />
    },
    {
      title: "Notifications personnalisées",
      description: "Alertes sur les informations importantes concernant l'élève",
      icon: <Bell className="h-10 w-10 text-teranga-blue" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-teranga-background transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Portail Parents</h1>
            <div className="h-1 w-20 bg-teranga-blue mb-8"></div>
            <p className="text-lg text-gray-700">
              Notre portail parents facilite la communication et l'implication des parents 
              dans le parcours scolaire de leurs enfants. Renforcez le lien entre l'école 
              et les familles pour une éducation plus cohérente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ModuleCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                linkTo="#"
                delay={index * 100}
              />
            ))}
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg mt-12 animate-fade-in-up">
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
        
        <footer className="bg-white py-8 border-t border-gray-100 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ParentPortal;
