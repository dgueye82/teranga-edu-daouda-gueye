
import React from "react";
import { Student, StudentPerformance } from "@/types/student";
import { exportReportCardToPdf } from "@/services/exportService";
import ReportCardHeader from "./ReportCardHeader";
import ReportCardTitle from "./ReportCardTitle";
import StudentInfoCard from "./StudentInfoCard";
import SchoolInfoCard from "./SchoolInfoCard";
import SubjectsTable from "./SubjectsTable";
import FinalResultCard from "./FinalResultCard";
import SignatureSection from "./SignatureSection";
import Footer from "./Footer";
import PrintStyles from "./PrintStyles";
import { getAppreciation, getGlobalAppreciation, getGradeColor } from "./utils/gradeUtils";

interface ReportCardProps {
  student: Student;
  averageInfo: {
    overallAverage: number;
    percentage: number;
    subjectAverages: {
      subject: string;
      average: number;
      maxGrade: number;
      percentage: number;
      count: number;
    }[];
  };
  performances: StudentPerformance[];
  trimestre: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  student,
  averageInfo,
  performances,
  trimestre
}) => {
  const handleExportPdf = () => {
    exportReportCardToPdf(student, averageInfo, performances, trimestre);
  };

  const handlePrint = () => {
    window.print();
  };
  
  // Extraire la classe de l'élève à partir des notes (qui contiennent la classe)
  const studentClass = student.notes || "Non spécifiée";
  // Assurer que l'école est correctement affichée
  const schoolName = student.school_name || "Non spécifiée";

  return (
    <div className="print:shadow-none print:m-0 print:p-0">
      <ReportCardHeader 
        trimestre={trimestre} 
        onPrint={handlePrint} 
        onExportPdf={handleExportPdf} 
      />

      <div id="report-card" className="space-y-6 print:space-y-4">
        <ReportCardTitle trimestre={trimestre} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
          <StudentInfoCard student={student} studentClass={studentClass} />
          <SchoolInfoCard schoolName={schoolName} studentClass={studentClass} />
        </div>

        <SubjectsTable 
          subjectAverages={averageInfo.subjectAverages} 
          getGradeColor={getGradeColor} 
          getAppreciation={getAppreciation} 
        />

        <FinalResultCard 
          overallAverage={averageInfo.overallAverage} 
          percentage={averageInfo.percentage} 
          getGradeColor={getGradeColor} 
          getGlobalAppreciation={getGlobalAppreciation} 
          studentFirstName={student.first_name} 
        />

        <SignatureSection />
        <Footer />
      </div>

      <PrintStyles />
    </div>
  );
};

export default ReportCard;
