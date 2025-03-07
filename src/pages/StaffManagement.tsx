
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffDashboardTab from "@/components/staff/StaffDashboardTab";
import StaffListTab from "@/components/staff/StaffListTab";

const StaffManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Gestion du Personnel</h1>
              <p className="text-gray-600 mt-2">
                Gérez efficacement le personnel de votre établissement
              </p>
            </div>
            
            <Tabs
              defaultValue="dashboard"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
                <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="staff-list" onClick={() => setActiveTab("staff-list")}>
                  Liste du personnel
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-4">
                <StaffDashboardTab />
              </TabsContent>
              
              <TabsContent value="staff-list" className="space-y-4">
                <StaffListTab />
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
    </div>
  );
};

export default StaffManagement;
