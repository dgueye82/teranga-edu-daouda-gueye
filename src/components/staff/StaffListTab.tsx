
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import StaffForm from "./StaffForm";
import StaffFilters from "./StaffFilters";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import { Staff, StaffFormData } from "@/types/staff";
import { getStaffMembers, addStaffMember, updateStaffMember } from "@/services/staff";

const StaffListTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staffMembers, setStaffMembers] = useState<Staff[]>(getStaffMembers());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);
  const { toast } = useToast();

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      setStaffMembers(getStaffMembers());
      toast({
        title: "Membre du personnel mis à jour",
        description: `${data.name} a été mis à jour avec succès.`
      });
    } else {
      // Add new staff
      addStaffMember(data);
      setStaffMembers(getStaffMembers());
      toast({
        title: "Membre du personnel ajouté",
        description: `${data.name} a été ajouté avec succès.`
      });
    }
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
        filteredStaff={filteredStaff}
        onViewStaff={handleViewStaff}
        onEditStaff={handleEditStaff}
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
