
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import Hero from '@/components/ui/Hero';
import ModuleCard from '@/components/ui/ModuleCard';
import { ArrowRight, BookOpen, Users, School, Calendar, Clipboard, LineChart } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero
          title="TERANGA EDU"
          subtitle="Plateforme de gestion scolaire moderne et intuitive"
          imageUrl="/lovable-uploads/bdefbc76-5b4e-49c8-b669-87f0b0682e51.png"
        />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Accès Rapide</h2>
            <div className="flex justify-center mb-8">
              <Link to="/student-management">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Voir la liste des élèves <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ModuleCard
                title="Gestion des écoles"
                description="Gérez les informations et les configurations de vos établissements scolaires."
                icon={<School className="h-10 w-10 text-orange-500" />}
                linkTo="/school-management"
              />
              <ModuleCard
                title="Gestion des élèves"
                description="Suivez les informations, les performances et l'assiduité de vos élèves."
                icon={<Users className="h-10 w-10 text-orange-500" />}
                linkTo="/student-management"
              />
              <ModuleCard
                title="Gestion du personnel"
                description="Gérez les enseignants, le personnel administratif et les autres membres du personnel."
                icon={<Clipboard className="h-10 w-10 text-orange-500" />}
                linkTo="/staff-management"
              />
              <ModuleCard
                title="Curriculum"
                description="Gérez les programmes scolaires, les cours et les matières enseignées."
                icon={<BookOpen className="h-10 w-10 text-orange-500" />}
                linkTo="/curriculum"
              />
              <ModuleCard
                title="Emploi du temps"
                description="Organisez et visualisez les emplois du temps des classes et des enseignants."
                icon={<Calendar className="h-10 w-10 text-orange-500" />}
                linkTo="/planning"
              />
              <ModuleCard
                title="Suivi des performances"
                description="Analysez et suivez les performances académiques des élèves."
                icon={<LineChart className="h-10 w-10 text-orange-500" />}
                linkTo="/performance"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Gestion des Écoles</h3>
                <p className="text-gray-600">
                  Centralisez toutes les informations de vos écoles en un seul endroit.
                  Ajoutez, modifiez et supprimez des écoles facilement.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Gestion des Élèves</h3>
                <p className="text-gray-600">
                  Suivez les progrès de chaque élève, gérez leurs informations personnelles
                  et leurs performances scolaires.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Gestion du Personnel</h3>
                <p className="text-gray-600">
                  Organisez les informations de votre personnel, attribuez des rôles et
                  gérez les accès à la plateforme.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
