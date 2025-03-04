
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StudentList from "@/components/students/StudentList";
import StudentForm from "@/components/students/StudentForm";
import StudentFilters from "@/components/students/StudentFilters";
import { Student, StudentFormData } from "@/types/student";
import { School } from "@/types/school";

interface StudentListTabProps {
  students: Student[];
  schools: School[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  schoolFilter: string;
  setSchoolFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleAddStudent: () => void;
  handleEditStudent: (student: Student) => void;
  handleDeleteStudent: (id: string) => void;
  handleFormSubmit: (data: StudentFormData) => Promise<void>;
  selectedStudent?: Student;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
}

const StudentListTab: React.FC<StudentListTabProps> = ({
  students,
  schools,
  searchTerm,
  setSearchTerm,
  schoolFilter,
  setSchoolFilter,
  statusFilter,
  setStatusFilter,
  handleAddStudent,
  handleEditStudent,
  handleDeleteStudent,
  handleFormSubmit,
  selectedStudent,
  isFormOpen,
  setIsFormOpen
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <StudentFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          schoolFilter={schoolFilter}
          setSchoolFilter={setSchoolFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          schools={schools}
        />
        <Button onClick={handleAddStudent} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un étudiant
        </Button>
      </div>
      
      <StudentForm 
        student={selectedStudent}
        schools={schools}
        onSubmit={handleFormSubmit}
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      
      <Separator className="my-6" />
      
      <StudentList 
        students={students}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentListTab;
