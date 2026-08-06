import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { LayoutGrid, LayoutList, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StaffForm from "./StaffForm";
import StaffDetailsDialog from "./StaffDetailsDialog";

import StaffFilters from "./StaffFilters";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffCardView from "./StaffCardView";
import { Staff, StaffFormData } from "@/types/staff";
import {
  getStaffMembers,
  filterStaff,
  addStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from "@/services/staff";
import { useSchoolScope } from "@/contexts/SchoolContext";
import { useAuth } from "@/contexts/AuthContext";

const PAGE_SIZE = 5;

const StaffListTab = () => {
  const [searchParams] = useSearchParams();
  const departmentFilter = searchParams.get("department");
  const { activeSchoolId } = useSchoolScope();
  const { hasPermission } = useAuth();
  const canManage = hasPermission("staff.manage");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ["staff", activeSchoolId],
    queryFn: () => getStaffMembers(activeSchoolId),
  });

  const filtered = useMemo(
    () => filterStaff(staff, searchTerm, departmentFilter || undefined),
    [staff, searchTerm, departmentFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["staff"] });

  const saveMutation = useMutation({
    mutationFn: async (data: StaffFormData) =>
      selectedStaff
        ? updateStaffMember(selectedStaff.id, data)
        : addStaffMember(data, activeSchoolId),
    onSuccess: (_res, data) => {
      invalidate();
      toast({
        title: selectedStaff ? "Membre mis à jour" : "Membre ajouté",
        description: `${data.name} a été enregistré avec succès.`,
      });
      setIsFormOpen(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error?.message || "Enregistrement impossible.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStaffMember(id),
    onSuccess: () => {
      invalidate();
      toast({ title: "Membre supprimé" });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error?.message || "Suppression impossible.",
      });
    },
  });

  const handleAddStaff = () => {
    setSelectedStaff(undefined);
    setIsFormOpen(true);
  };

  const handleEditStaff = (member: Staff) => {
    setSelectedStaff(member);
    setIsFormOpen(true);
  };

  const handleViewStaff = (member: Staff) => {
    setSelectedStaff(member);
    setIsDetailsOpen(true);
  };

  const handleEditFromDetails = (member: Staff) => {
    setIsDetailsOpen(false);
    setSelectedStaff(member);
    setIsFormOpen(true);
  };

  const handleDeleteStaff = (member: Staff) => {
    if (window.confirm(`Supprimer ${member.name} ?`)) {
      deleteMutation.mutate(member.id);
    }
  };

  const handlePageChange = (next: number) => {
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleViewMode = () => setViewMode(viewMode === "table" ? "card" : "table");

  return (
    <div className="space-y-6">
      <StaffFilters />

      <div className="flex justify-between items-center">
        <div className="flex-1">
          <StaffActionBar
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            onAddStaff={handleAddStaff}
            canManage={canManage}
          />
        </div>

        <Button variant="outline" size="sm" onClick={toggleViewMode} className="ml-2">
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

      {isLoading ? (
        <div className="flex justify-center py-12 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : viewMode === "table" ? (
        <StaffTable
          filteredStaff={pageData}
          onViewStaff={handleViewStaff}
          onEditStaff={handleEditStaff}
          onDeleteStaff={canManage ? handleDeleteStaff : undefined}
          canManage={canManage}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <StaffCardView
          filteredStaff={pageData}
          onViewStaff={handleViewStaff}
          onEditStaff={handleEditStaff}
          canManage={canManage}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <StaffForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => saveMutation.mutate(data as StaffFormData)}
        staffMember={selectedStaff}
      />

      <StaffDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        staffMember={selectedStaff}
        onEdit={canManage ? handleEditFromDetails : undefined}
      />
    </div>
  );
};

export default StaffListTab;
