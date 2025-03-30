
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import DirectorSidebar from "@/components/director/DirectorSidebar";
import StaffTable from "@/components/staff/StaffTable";
import StaffFilters from "@/components/staff/StaffFilters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Download, Upload } from "lucide-react";
import { getPaginatedStaffMembers } from "@/services/staff";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/staff/SearchBar";

const StaffManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("teachers");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Récupérer le personnel en fonction du filtre de département
  const staffData = getPaginatedStaffMembers(
    1, 
    20, 
    searchTerm,
    currentTab === "teachers" ? "teaching" : currentTab === "admin" ? "administrative" : undefined
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "La liste du personnel est en cours d'exportation au format CSV"
    });
    // Logique d'export à implémenter
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DirectorSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/director-dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion du Personnel</h1>
              <p className="text-gray-600 mt-1">
                Gérez les enseignants et le personnel administratif
              </p>
            </div>
          </div>

          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="teachers">Enseignants</TabsTrigger>
                <TabsTrigger value="admin">Personnel Administratif</TabsTrigger>
                <TabsTrigger value="all">Tous</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Importer
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
              <StaffFilters />
            </div>

            <TabsContent value="teachers" className="mt-0">
              <StaffTable 
                filteredStaff={staffData.data.filter(staff => 
                  staff.role.toLowerCase().includes("enseignant") || 
                  staff.department === "Mathématiques" ||
                  staff.department === "Sciences" ||
                  staff.department === "Lettres" ||
                  staff.department === "Langues" ||
                  staff.department === "Histoire-Géographie" ||
                  staff.department === "Education Physique" ||
                  staff.department === "Informatique"
                )}
                onViewStaff={(staff) => navigate(`/director/staff/${staff.id}`)}
                onEditStaff={(staff) => navigate(`/director/staff/${staff.id}/edit`)}
                currentPage={1}
                totalPages={Math.ceil(staffData.total / 20)}
                onPageChange={() => {}}
              />
            </TabsContent>
            
            <TabsContent value="admin" className="mt-0">
              <StaffTable 
                filteredStaff={staffData.data.filter(staff => 
                  staff.role.includes("Directeur") || 
                  staff.role.includes("Adjoint") || 
                  staff.role.includes("Conseiller") || 
                  staff.role.includes("Administrateur") || 
                  staff.role.includes("Technicien") || 
                  staff.role.includes("Entretien") ||
                  staff.department === "Administration" ||
                  staff.department === "Support Technique" ||
                  staff.department === "Orientation"
                )}
                onViewStaff={(staff) => navigate(`/director/staff/${staff.id}`)}
                onEditStaff={(staff) => navigate(`/director/staff/${staff.id}/edit`)}
                currentPage={1}
                totalPages={Math.ceil(staffData.total / 20)}
                onPageChange={() => {}}
              />
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <StaffTable 
                filteredStaff={staffData.data}
                onViewStaff={(staff) => navigate(`/director/staff/${staff.id}`)}
                onEditStaff={(staff) => navigate(`/director/staff/${staff.id}/edit`)}
                currentPage={1}
                totalPages={Math.ceil(staffData.total / 20)}
                onPageChange={() => {}}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StaffManagement;
