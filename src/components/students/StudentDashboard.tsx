
import React from "react";
import { Student } from "@/types/student";
import { School } from "@/types/school";

interface StudentDashboardProps {
  students: Student[];
  schools: School[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ students, schools }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Vue d'ensemble des élèves</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-500 text-sm">Total des élèves</p>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-500 text-sm">Élèves actifs</p>
          <p className="text-2xl font-bold">
            {students.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-500 text-sm">Écoles</p>
          <p className="text-2xl font-bold">{schools.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-purple-500 text-sm">Diplômés</p>
          <p className="text-2xl font-bold">
            {students.filter(s => s.status === 'graduated').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
