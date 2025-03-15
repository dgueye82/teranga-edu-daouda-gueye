
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
  }
];

// Service methods for staff data
export const getStaffMembers = (): Staff[] => {
  return mockStaffMembers;
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
