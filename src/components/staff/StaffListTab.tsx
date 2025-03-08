
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserCog, ClipboardList, Calendar, Edit, Eye } from "lucide-react";
import NavLink from "@/components/layout/navigation/NavLink";
import StaffForm from "./StaffForm";
import { useToast } from "@/components/ui/use-toast";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  joinDate: string;
  status: string;
  email?: string;
  phone?: string;
  address?: string;
};

const mockStaffMembers = [
  { 
    id: "1", 
    name: "Amadou Diallo", 
    role: "Enseignant", 
    department: "Mathématiques", 
    joinDate: "12/09/2022",
    status: "Actif",
    email: "amadou.diallo@example.com",
    phone: "77 123 45 67"
  },
  { 
    id: "2", 
    name: "Fatou Sow", 
    role: "Directrice Adjointe", 
    department: "Administration", 
    joinDate: "01/05/2021",
    status: "Actif",
    email: "fatou.sow@example.com",
    phone: "78 234 56 78"
  },
  { 
    id: "3", 
    name: "Ibrahim Ndiaye", 
    role: "Enseignant", 
    department: "Sciences", 
    joinDate: "15/10/2022",
    status: "Actif",
    email: "ibrahim.ndiaye@example.com",
    phone: "76 345 67 89"
  },
  { 
    id: "4", 
    name: "Marie Faye", 
    role: "Conseillère Pédagogique", 
    department: "Orientation", 
    joinDate: "03/01/2023",
    status: "Congé",
    email: "marie.faye@example.com",
    phone: "70 456 78 90"
  },
  { 
    id: "5", 
    name: "Ousmane Sarr", 
    role: "Technicien", 
    department: "Informatique", 
    joinDate: "22/11/2022",
    status: "Actif",
    email: "ousmane.sarr@example.com",
    phone: "75 567 89 01"
  }
];

const StaffListTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(mockStaffMembers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | undefined>(undefined);
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

  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleViewStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleSubmitStaff = (data: any) => {
    if (selectedStaff) {
      // Edit existing staff
      const updatedStaffMembers = staffMembers.map(staff => 
        staff.id === selectedStaff.id ? { ...staff, ...data } : staff
      );
      setStaffMembers(updatedStaffMembers);
      toast({
        title: "Membre du personnel mis à jour",
        description: `${data.name} a été mis à jour avec succès.`
      });
    } else {
      // Add new staff
      const newStaff = {
        id: Date.now().toString(),
        ...data
      };
      setStaffMembers([...staffMembers, newStaff]);
      toast({
        title: "Membre du personnel ajouté",
        description: `${data.name} a été ajouté avec succès.`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <NavLink to="/staff-management" variant="button">
            Tout le personnel
          </NavLink>
          <NavLink to="/staff-management?department=teaching" variant="button">
            Personnel enseignant
          </NavLink>
          <NavLink to="/staff-management?department=administrative" variant="button">
            Personnel administratif
          </NavLink>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center w-full md:w-1/3 relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un membre du personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddStaff}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un membre
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fonction
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'entrée
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{staff.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{staff.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{staff.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{staff.joinDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" onClick={() => handleViewStaff(staff)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staff)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStaff.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              Aucun membre du personnel trouvé
            </div>
          )}
        </div>
      </div>

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
