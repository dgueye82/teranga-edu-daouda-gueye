
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffListTab from "@/components/staff/StaffListTab";

const StaffManagement = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-teranga-background transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestion du Personnel</h1>
            <p className="text-gray-600 mt-2">
              Gérez efficacement le personnel de votre établissement
            </p>
          </div>
          
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="list">Liste du personnel</TabsTrigger>
              <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
              <TabsTrigger value="cards">Vue d'ensemble</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <StaffListTab />
            </TabsContent>
            
            <TabsContent value="dashboard">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Tableau de bord du personnel</h2>
                <p className="text-gray-600">
                  Fonctionnalité en cours de développement. Consultez les statistiques, 
                  les indicateurs de performance et les fonctionnalités clés pour une gestion 
                  efficace des ressources humaines.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Tableau de Bord</CardTitle>
                    <CardDescription>
                      Accédez à une vue d'ensemble de la gestion de votre personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Consultez les statistiques, les indicateurs de performance et les fonctionnalités clés
                      pour une gestion efficace des ressources humaines.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/staff-dashboard')}
                    >
                      Accéder au tableau de bord
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Liste du Personnel</CardTitle>
                    <CardDescription>
                      Consultez et gérez tous les membres du personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Affichez, recherchez, ajoutez, modifiez et organisez les informations 
                      relatives à chaque membre du personnel.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/staff-list')}
                    >
                      Voir la liste du personnel
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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

export default StaffManagement;
