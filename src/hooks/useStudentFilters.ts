
import { useState, useMemo } from "react";
import { Student } from "@/types/student";
import { filterStudents } from "@/utils/studentFilters";

type SortField = 'name' | 'date' | 'status' | 'average' | '';
type SortOrder = 'asc' | 'desc';

export const useStudentFilters = (students: Student[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredStudents = useMemo(() => {
    // First, filter the students based on search, grade, school and status
    const filtered = filterStudents(students, searchTerm, selectedSchool, statusFilter);
    
    // Then apply grade filter (kept separate for backward compatibility)
    const gradeFiltered = filtered.filter(student => 
      selectedGrade === "all" || 
      (student.notes && student.notes.includes(selectedGrade))
    );

    // Apply sorting if a sort field is selected
    if (sortField) {
      return [...gradeFiltered].sort((a, b) => {
        let comparison = 0;
        
        switch (sortField) {
          case 'name':
            comparison = `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`);
            break;
          case 'date':
            const dateA = a.enrollment_date ? new Date(a.enrollment_date).getTime() : 0;
            const dateB = b.enrollment_date ? new Date(b.enrollment_date).getTime() : 0;
            comparison = dateA - dateB;
            break;
          case 'status':
            comparison = (a.status || '').localeCompare(b.status || '');
            break;
          default:
            comparison = 0;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return gradeFiltered;
  }, [students, searchTerm, selectedGrade, selectedSchool, statusFilter, sortField, sortOrder]);

  // Function to toggle sort
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    selectedSchool,
    setSelectedSchool,
    statusFilter,
    setStatusFilter,
    sortField,
    sortOrder,
    toggleSort,
    filteredStudents
  };
};
