
import { Student } from "@/types/student";

export const filterStudents = (
  students: Student[],
  searchTerm: string,
  schoolFilter: string,
  statusFilter: string
): Student[] => {
  return students.filter(student => {
    const matchesSearch = searchTerm === "" ||
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.phone && student.phone.includes(searchTerm));
      
    const matchesSchool = schoolFilter === "all" || student.school_id === schoolFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });
};

export const getStatusLabel = (status?: string): string => {
  switch (status) {
    case "active": return "Actif";
    case "inactive": return "Inactif";
    case "graduated": return "Diplômé";
    case "suspended": return "Suspendu";
    default: return "Non défini";
  }
};

export const getStatusClass = (status?: string): string => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800";
    case "inactive": return "bg-gray-100 text-gray-800";
    case "graduated": return "bg-blue-100 text-blue-800";
    case "suspended": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};
