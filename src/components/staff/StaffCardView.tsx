
import React from "react";
import { Staff } from "@/types/staff";
import StaffCard from "./StaffCard";
import StaffPagination from "./StaffPagination";

interface StaffCardViewProps {
  filteredStaff: Staff[];
  onViewStaff: (staff: Staff) => void;
  onEditStaff: (staff: Staff) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StaffCardView: React.FC<StaffCardViewProps> = ({ 
  filteredStaff,
  onViewStaff,
  onEditStaff,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onViewStaff={onViewStaff}
              onEditStaff={onEditStaff}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Aucun membre du personnel trouvé
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <StaffPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default StaffCardView;
