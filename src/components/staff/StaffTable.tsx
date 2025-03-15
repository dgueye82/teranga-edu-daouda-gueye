
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye } from "lucide-react";
import { Staff } from "@/types/staff";

interface StaffTableProps {
  filteredStaff: Staff[];
  onViewStaff: (staff: Staff) => void;
  onEditStaff: (staff: Staff) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({ 
  filteredStaff,
  onViewStaff,
  onEditStaff 
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Fonction</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Date d'entrée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-gray-900">{staff.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{staff.role}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{staff.department}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{staff.joinDate}</div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    staff.status === 'Actif' 
                      ? 'bg-green-100 text-green-800' 
                      : staff.status === 'Congé'
                      ? 'bg-yellow-100 text-yellow-800'
                      : staff.status === 'Suspendu'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {staff.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewStaff(staff)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEditStaff(staff)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredStaff.length === 0 && (
          <div className="px-6 py-4 text-center text-gray-500">
            Aucun membre du personnel trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffTable;
