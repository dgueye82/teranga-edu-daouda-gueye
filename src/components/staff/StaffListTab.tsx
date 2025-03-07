
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserCog, ClipboardList, Calendar } from "lucide-react";
import NavLink from "@/components/layout/navigation/NavLink";

const mockStaffMembers = [
  { 
    id: "1", 
    name: "Amadou Diallo", 
    role: "Enseignant", 
    department: "Mathématiques", 
    joinDate: "12/09/2022",
    status: "Actif" 
  },
  { 
    id: "2", 
    name: "Fatou Sow", 
    role: "Directrice Adjointe", 
    department: "Administration", 
    joinDate: "01/05/2021",
    status: "Actif" 
  },
  { 
    id: "3", 
    name: "Ibrahim Ndiaye", 
    role: "Enseignant", 
    department: "Sciences", 
    joinDate: "15/10/2022",
    status: "Actif" 
  },
  { 
    id: "4", 
    name: "Marie Faye", 
    role: "Conseillère Pédagogique", 
    department: "Orientation", 
    joinDate: "03/01/2023",
    status: "Congé" 
  },
  { 
    id: "5", 
    name: "Ousmane Sarr", 
    role: "Technicien", 
    department: "Informatique", 
    joinDate: "22/11/2022",
    status: "Actif" 
  }
];

const StaffListTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staffMembers] = useState(mockStaffMembers);

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button>
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
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-teranga-blue hover:text-teranga-blue/80">
                      Voir
                    </Button>
                    <Button variant="ghost" size="sm" className="text-teranga-blue hover:text-teranga-blue/80">
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
    </div>
  );
};

export default StaffListTab;
