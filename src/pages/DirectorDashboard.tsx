
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  UserCheck,
  School,
  FileText,
  BookOpen,
  MessageSquare,
  Calendar,
  Book,
  DollarSign,
  ClipboardList,
  BoxesIcon,
  BarChart,
  Shield
} from "lucide-react";

const DirectorDashboard = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord du Directeur</h1>
          <p className="text-gray-600 mt-1">
            Gérez efficacement votre établissement scolaire
          </p>
        </div>

        {isAdmin && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Fonctionnalités d'Administration
            </h2>
            <p className="mt-1 text-blue-600 mb-3">
              En tant qu'administrateur, vous avez accès à des outils supplémentaires.
            </p>
            <Link 
              to="/admin/users" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Gestion des Utilisateurs
            </Link>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="staff">Personnel</TabsTrigger>
            <TabsTrigger value="students">Élèves</TabsTrigger>
            <TabsTrigger value="administrative">Administration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Vue d'ensemble - Cartes principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard 
                title="Personnel" 
                description="Gestion des enseignants et du personnel administratif" 
                icon={<Users className="h-6 w-6 text-blue-600" />}
                link="/director/staff"
              />
              <DashboardCard 
                title="Élèves" 
                description="Vue par classe et historique des élèves" 
                icon={<School className="h-6 w-6 text-green-600" />}
                link="/director/students"
              />
              <DashboardCard 
                title="Calendrier" 
                description="Événements, examens et réunions" 
                icon={<Calendar className="h-6 w-6 text-purple-600" />}
                link="/director/calendar"
              />
              <DashboardCard 
                title="Bulletins & Évaluations" 
                description="Relevés scolaires et suivi des performances" 
                icon={<FileText className="h-6 w-6 text-orange-600" />}
                link="/director/reports"
              />
              <DashboardCard 
                title="Budget & Finances" 
                description="Suivi des contributions et budget annuel" 
                icon={<DollarSign className="h-6 w-6 text-red-600" />}
                link="/director/finance"
              />
              <DashboardCard 
                title="Matériel & Inventaire" 
                description="Gestion des équipements et mobiliers" 
                icon={<BoxesIcon className="h-6 w-6 text-gray-600" />}
                link="/director/inventory"
              />
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard 
                title="Enseignants" 
                description="Profils, présences et formations" 
                icon={<BookOpen className="h-6 w-6 text-blue-600" />}
                link="/director/teachers"
              />
              <DashboardCard 
                title="Personnel Administratif" 
                description="Surveillants, secrétaires, comptables" 
                icon={<UserCheck className="h-6 w-6 text-indigo-600" />}
                link="/director/admin-staff"
              />
              <DashboardCard 
                title="Planification Cours" 
                description="Relation professeur-cours-classes" 
                icon={<Book className="h-6 w-6 text-teal-600" />}
                link="/director/course-planning"
              />
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard 
                title="Classes" 
                description="Liste des élèves par classe" 
                icon={<Users className="h-6 w-6 text-emerald-600" />}
                link="/director/classes"
              />
              <DashboardCard 
                title="Dossiers Scolaires" 
                description="Bulletins, présences et historique" 
                icon={<ClipboardList className="h-6 w-6 text-amber-600" />}
                link="/director/student-records"
              />
              <DashboardCard 
                title="Discipline" 
                description="Suivi des punitions et correspondance" 
                icon={<MessageSquare className="h-6 w-6 text-rose-600" />}
                link="/director/discipline"
              />
            </div>
          </TabsContent>

          <TabsContent value="administrative" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard 
                title="Calendrier Annuel" 
                description="Planification des événements et réunions" 
                icon={<Calendar className="h-6 w-6 text-cyan-600" />}
                link="/director/annual-calendar"
              />
              <DashboardCard 
                title="Finances" 
                description="Contributions et budget" 
                icon={<BarChart className="h-6 w-6 text-yellow-600" />}
                link="/director/finances"
              />
              <DashboardCard 
                title="Inventaire" 
                description="Matériel informatique et mobilier" 
                icon={<BoxesIcon className="h-6 w-6 text-slate-600" />}
                link="/director/inventory-management"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TERANGA EDU. Tous droits réservés.</p>
          <p className="mt-1 text-sm">Tableau de Bord du Directeur v1.0</p>
        </div>
      </footer>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardCard = ({ title, description, icon, link }: DashboardCardProps) => {
  return (
    <Link to={link} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DirectorDashboard;
