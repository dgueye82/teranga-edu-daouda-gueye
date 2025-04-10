
import { Student } from "@/types/student";

export const filterStudents = (
  students: Student[],
  searchTerm: string,
  schoolFilter: string,
  statusFilter: string
): Student[] => {
  return students.filter(student => {
    const matchesSearch = 
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.phone && student.phone.includes(searchTerm));
      
    const matchesSchool = schoolFilter === "all" || student.school_id === schoolFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });
};
