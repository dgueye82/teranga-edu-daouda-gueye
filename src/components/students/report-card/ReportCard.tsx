
import React from "react";
import { Student, StudentPerformance } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Printer } from "lucide-react";
import { exportReportCardToPdf } from "@/services/exportService";

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
  
  const getAppreciation = (percentage: number): string => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Très bien";
    if (percentage >= 70) return "Bien";
    if (percentage >= 60) return "Assez bien";
    if (percentage >= 50) return "Passable";
    return "Insuffisant";
  };
  
  const getGlobalAppreciation = (percentage: number): string => {
    if (percentage >= 90) return "Félicitations";
    if (percentage >= 80) return "Compliments du conseil de classe";
    if (percentage >= 70) return "Tableau d'honneur";
    if (percentage >= 60) return "Encouragements";
    if (percentage >= 50) return "Doit faire plus d'efforts";
    return "Travail insuffisant";
  };

  const getGradeColor = (percentage: number): string => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-amber-600";
    return "text-red-600";
  };

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
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold">Bulletin de Notes - {trimestre}</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleExportPdf}
          >
            <FileDown className="h-4 w-4" />
            Exporter PDF
          </Button>
        </div>
      </div>

      <div id="report-card" className="space-y-6 print:space-y-4">
        <div className="text-center print:text-center">
          <h1 className="text-xl font-bold uppercase print:text-xl">Bulletin de Notes</h1>
          <h2 className="text-lg font-semibold print:text-lg">{trimestre}</h2>
          <p>Année scolaire {new Date().getFullYear() - 1}-{new Date().getFullYear()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Informations de l'élève</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Nom:</span> {student.last_name}</p>
                <p><span className="font-medium">Prénom:</span> {student.first_name}</p>
                {student.birth_date && (
                  <p><span className="font-medium">Date de naissance:</span> {new Date(student.birth_date).toLocaleDateString()}</p>
                )}
                {student.status && (
                  <p><span className="font-medium">Statut:</span> {student.status}</p>
                )}
                <p><span className="font-medium">Classe:</span> {studentClass}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">École</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Nom:</span> {schoolName}</p>
                <p><span className="font-medium">Classe:</span> {studentClass}</p>
                <p><span className="font-medium">Année scolaire:</span> {new Date().getFullYear() - 1}-{new Date().getFullYear()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Résultats par matière</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matière</TableHead>
                  <TableHead className="text-right">Moyenne</TableHead>
                  <TableHead className="text-right">Sur</TableHead>
                  <TableHead className="text-right">Pourcentage</TableHead>
                  <TableHead>Appréciation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {averageInfo.subjectAverages.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subject.subject}</TableCell>
                    <TableCell className={`text-right ${getGradeColor(subject.percentage)}`}>
                      {subject.average.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">{subject.maxGrade.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${getGradeColor(subject.percentage)}`}>
                      {subject.percentage.toFixed(2)}%
                    </TableCell>
                    <TableCell>{getAppreciation(subject.percentage)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Résultat final</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Moyenne générale</p>
                  <p className={`text-xl font-bold ${getGradeColor(averageInfo.percentage)}`}>
                    {averageInfo.overallAverage.toFixed(2)}/20
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Pourcentage</p>
                  <p className={`text-xl font-bold ${getGradeColor(averageInfo.percentage)}`}>
                    {averageInfo.percentage.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Appréciation</p>
                  <p className="text-lg font-semibold">
                    {getGlobalAppreciation(averageInfo.percentage)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Commentaires</h3>
                <p className="text-gray-700">
                  {averageInfo.percentage >= 70 
                    ? `${student.first_name} a obtenu d'excellents résultats ce trimestre. Félicitations !` 
                    : averageInfo.percentage >= 50
                    ? `${student.first_name} a obtenu des résultats satisfaisants. Continuez à travailler régulièrement.`
                    : `${student.first_name} doit fournir plus d'efforts et travailler plus régulièrement.`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 print:grid-cols-2 print:mt-4">
          <div>
            <p className="font-semibold mb-2">Le Directeur / La Directrice</p>
            <div className="h-16 border-b border-dashed"></div>
          </div>
          <div>
            <p className="font-semibold mb-2">Parent / Tuteur</p>
            <div className="h-16 border-b border-dashed"></div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-6 print:pt-2">
          <p>Document généré le {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <style>
        {`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          nav, footer, .print-hidden, button {
            display: none !important;
          }
          body * {
            visibility: hidden;
          }
          #report-card, #report-card * {
            visibility: visible;
          }
          #report-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ReportCard;
