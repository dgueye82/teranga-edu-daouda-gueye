
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Eye, Mail, Phone, User } from "lucide-react";
import { Staff } from "@/types/staff";

interface StaffCardProps {
  staff: Staff;
  onViewStaff: (staff: Staff) => void;
  onEditStaff: (staff: Staff) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ 
  staff,
  onViewStaff,
  onEditStaff
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-teranga-skyBlue flex items-center justify-center mb-3">
            <User className="h-8 w-8 text-teranga-blue" />
          </div>
          <h3 className="font-medium text-lg text-gray-900">{staff.name}</h3>
          <p className="text-sm text-gray-500">{staff.role}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium w-24">Département:</span>
            <span>{staff.department}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium w-24">Date d'entrée:</span>
            <span>{staff.joinDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium w-24 text-gray-500">Statut:</span>
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
          </div>
          
          {staff.email && (
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{staff.email}</span>
            </div>
          )}
          
          {staff.phone && (
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>{staff.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm" onClick={() => onViewStaff(staff)}>
          <Eye className="h-4 w-4 mr-1" />
          Voir
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEditStaff(staff)}>
          <Edit className="h-4 w-4 mr-1" />
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaffCard;
