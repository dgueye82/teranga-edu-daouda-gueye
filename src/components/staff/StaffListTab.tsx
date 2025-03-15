
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import StaffForm from "./StaffForm";
import StaffFilters from "./StaffFilters";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
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

  return (
    <div className="space-y-6">
      <StaffFilters />
      
      <StaffActionBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddStaff={handleAddStaff}
      />
      
      <Separator className="my-6" />
      
      <StaffTable 
        filteredStaff={staffData.data}
        onViewStaff={handleViewStaff}
        onEditStaff={handleEditStaff}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
