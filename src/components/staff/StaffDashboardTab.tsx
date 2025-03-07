
import React from "react";
import { UserCog, ClipboardList, Calendar, Award, BarChart } from "lucide-react";

const StaffDashboardTab = () => {
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
    <div className="space-y-8">
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
  );
};

export default StaffDashboardTab;
