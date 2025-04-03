
import { useState, useMemo } from "react";
import { Student } from "@/types/student";

export const useStudentFilters = (students: Student[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === "" || 
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = selectedGrade === "all" || 
        (student.notes && student.notes.includes(selectedGrade));
      
      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, selectedGrade]);

  return {
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    filteredStudents
  };
};
