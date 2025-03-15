
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import StaffForm from "./StaffForm";
import StaffFilters from "./StaffFilters";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffCardView from "./StaffCardView";
import { Staff, StaffFormData } from "@/types/staff";
import { getPaginatedStaffMembers, addStaffMember, updateStaffMember } from "@/services/staff";

const StaffListTab = () => {
  const [searchParams] = useSearchParams();
  const departmentFilter = searchParams.get("department");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [staffData, setStaffData] = useState<{ data: Staff[], total: number }>({ data: [], total: 0 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const { toast } = useToast();

  // Calculate total pages
  const totalPages = Math.ceil(staffData.total / pageSize);

  // Load staff data with pagination
  useEffect(() => {
    const result = getPaginatedStaffMembers(currentPage, pageSize, searchTerm, departmentFilter || undefined);
    setStaffData(result);
  }, [currentPage, pageSize, searchTerm, departmentFilter]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter]);

  const handleAddStaff = () => {
    setSelectedStaff(undefined);
    setIsFormOpen(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleSubmitStaff = (data: StaffFormData) => {
    if (selectedStaff) {
      // Edit existing staff
      updateStaffMember(selectedStaff.id, data);
      toast({
        title: "Membre du personnel mis à jour",
        description: `${data.name} a été mis à jour avec succès.`
      });
    } else {
      // Add new staff
      addStaffMember(data);
      toast({
        title: "Membre du personnel ajouté",
        description: `${data.name} a été ajouté avec succès.`
      });
    }
    
    // Refresh data
    const result = getPaginatedStaffMembers(currentPage, pageSize, searchTerm, departmentFilter || undefined);
    setStaffData(result);
    
    // Close form
    setIsFormOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  return (
    <div className="space-y-6">
      <StaffFilters />
      
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <StaffActionBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddStaff={handleAddStaff}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleViewMode}
          className="ml-2"
        >
          {viewMode === "table" ? (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Vue Cartes
            </>
          ) : (
            <>
              <LayoutList className="h-4 w-4 mr-2" />
              Vue Tableau
            </>
          )}
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      {viewMode === "table" ? (
        <StaffTable 
          filteredStaff={staffData.data}
          onViewStaff={handleViewStaff}
          onEditStaff={handleEditStaff}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <StaffCardView
          filteredStaff={staffData.data}
          onViewStaff={handleViewStaff}
          onEditStaff={handleEditStaff}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <StaffForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitStaff}
        staffMember={selectedStaff}
      />
    </div>
  );
};

export default StaffListTab;
