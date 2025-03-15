
import { Staff } from "@/types/staff";

// Mock data for staff members
const mockStaffMembers: Staff[] = [
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
  },
  // Adding more mock data to demonstrate pagination
  { 
    id: "6", 
    name: "Aissatou Diop", 
    role: "Enseignante", 
    department: "Langues", 
    joinDate: "05/02/2023",
    status: "Actif",
    email: "aissatou.diop@example.com",
    phone: "77 678 90 12"
  },
  { 
    id: "7", 
    name: "Moustapha Kane", 
    role: "Coordinateur", 
    department: "Education Physique", 
    joinDate: "18/09/2022",
    status: "Actif",
    email: "moustapha.kane@example.com",
    phone: "78 789 01 23"
  },
  { 
    id: "8", 
    name: "Rokhaya Gueye", 
    role: "Bibliothécaire", 
    department: "Administration", 
    joinDate: "30/11/2022",
    status: "Actif",
    email: "rokhaya.gueye@example.com",
    phone: "76 890 12 34"
  },
  { 
    id: "9", 
    name: "Mamadou Seck", 
    role: "Enseignant", 
    department: "Histoire-Géographie", 
    joinDate: "14/10/2022",
    status: "Congé",
    email: "mamadou.seck@example.com",
    phone: "70 901 23 45"
  },
  { 
    id: "10", 
    name: "Bineta Mbaye", 
    role: "Assistante Administrative", 
    department: "Administration", 
    joinDate: "07/03/2023",
    status: "Actif",
    email: "bineta.mbaye@example.com",
    phone: "75 012 34 56"
  },
  { 
    id: "11", 
    name: "Lamine Fall", 
    role: "Enseignant", 
    department: "Mathématiques", 
    joinDate: "21/08/2022",
    status: "Actif",
    email: "lamine.fall@example.com",
    phone: "77 123 45 67"
  },
  { 
    id: "12", 
    name: "Coumba Ndoye", 
    role: "Infirmière Scolaire", 
    department: "Santé", 
    joinDate: "09/01/2023",
    status: "Actif",
    email: "coumba.ndoye@example.com",
    phone: "78 234 56 78"
  }
];

// Service methods for staff data
export const getStaffMembers = (): Staff[] => {
  return mockStaffMembers;
};

// New function to get paginated staff members
export const getPaginatedStaffMembers = (
  page: number = 1, 
  pageSize: number = 5, 
  searchTerm: string = "",
  departmentFilter?: string
): { data: Staff[]; total: number } => {
  let filtered = [...mockStaffMembers];
  
  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(staff => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply department filter if provided
  if (departmentFilter) {
    filtered = filtered.filter(staff => {
      if (departmentFilter === "teaching") {
        return staff.role.toLowerCase().includes("enseignant");
      } else if (departmentFilter === "administrative") {
        return staff.department.toLowerCase() === "administration";
      }
      return true;
    });
  }
  
  // Calculate pagination
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = filtered.slice(start, end);
  
  return {
    data: paginatedData,
    total
  };
};

export const addStaffMember = (staff: Omit<Staff, "id">): Staff => {
  const newStaff = {
    id: Date.now().toString(),
    ...staff
  };
  mockStaffMembers.push(newStaff);
  return newStaff;
};

export const updateStaffMember = (id: string, staffData: Partial<Staff>): Staff | undefined => {
  const index = mockStaffMembers.findIndex(staff => staff.id === id);
  if (index !== -1) {
    mockStaffMembers[index] = { ...mockStaffMembers[index], ...staffData };
    return mockStaffMembers[index];
  }
  return undefined;
};

export const deleteStaffMember = (id: string): boolean => {
  const index = mockStaffMembers.findIndex(staff => staff.id === id);
  if (index !== -1) {
    mockStaffMembers.splice(index, 1);
    return true;
  }
  return false;
};
