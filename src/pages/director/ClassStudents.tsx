
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import DirectorSidebar from "@/components/director/DirectorSidebar";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/services/schoolService";
import { getStudentsBySchool } from "@/services/student";

// Importing refactored components
import ClassHeader from "@/components/director/students/ClassHeader";
import ClassFilters from "@/components/director/students/ClassFilters";
import StudentsActionBar from "@/components/director/students/StudentsActionBar";
import StudentsList from "@/components/director/students/StudentsList";
import { useStudentFilters } from "@/hooks/useStudentFilters";

const ClassStudents = () => {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  
  // Définir les niveaux de classe
  const grades = [
    "CP1", "CP2", "CE1", "CE2", "CM1", "CM2", 
    "6ème", "5ème", "4ème", "3ème", 
    "2nde", "1ère", "Terminale"
  ];

  // Récupérer la liste des écoles
  const { data: schools = [] } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  // Récupérer les élèves par école
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students", selectedSchool],
    queryFn: () => selectedSchool ? getStudentsBySchool(selectedSchool) : [],
    enabled: !!selectedSchool,
  });

  // Using our custom hook for filtering students
  const {
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    filteredStudents
  } = useStudentFilters(students);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DirectorSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-16">
          <ClassHeader 
            title="Élèves par Classe"
            description="Consultez et gérez les élèves regroupés par classe"
            backLink="/director-dashboard"
          />

          <ClassFilters 
            schools={schools}
            selectedSchool={selectedSchool}
            setSelectedSchool={setSelectedSchool}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            grades={grades}
          />

          <StudentsActionBar 
            selectedGrade={selectedGrade}
            studentsCount={filteredStudents.length}
          />

          <StudentsList 
            students={filteredStudents}
            isLoading={isLoading}
            selectedSchool={selectedSchool}
          />
        </main>
      </div>
    </div>
  );
};

export default ClassStudents;
