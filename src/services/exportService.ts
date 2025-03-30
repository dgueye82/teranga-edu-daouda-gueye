
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Student, StudentPerformance } from "@/types/student";
import { getAppreciation, getGlobalAppreciation } from "@/components/students/report-card/utils/gradeUtils";

// Ajout du type pour jsPDF-autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportReportCardToPdf = (
  student: Student,
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
  },
  performances: StudentPerformance[],
  trimestre: string = "Trimestre 1"
): void => {
  // Initialiser le PDF (A4)
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  
  // Extraire la classe de l'élève depuis les notes
  const studentClass = student.notes || "Non spécifiée";
  // S'assurer que l'école est bien affichée
  const schoolName = student.school_name || "Non spécifiée";
  
  // Section titre
  addTitleSection(doc, pageWidth, trimestre);
  
  // Informations de l'école
  addSchoolInfoSection(doc, margin, schoolName);
  
  // Informations de l'élève
  addStudentInfoSection(doc, margin, student, studentClass);
  
  // Tableau des résultats par matière
  const tableEndY = addSubjectsTable(doc, margin, averageInfo.subjectAverages);
  
  // Moyenne générale
  addFinalResultSection(doc, margin, tableEndY, averageInfo, student.first_name);
  
  // Signatures
  addSignatureSection(doc, margin, tableEndY, pageWidth);
  
  // Pied de page
  addFooter(doc, pageWidth);
  
  // Télécharger le PDF
  doc.save(`bulletin_${student.last_name}_${student.first_name}_${trimestre.replace(/\s+/g, "_")}.pdf`);
};

// Ajouter le titre au PDF
function addTitleSection(doc: jsPDF, pageWidth: number, trimestre: string): void {
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BULLETIN DE NOTES", pageWidth / 2, 20, { align: "center" });
  doc.text(trimestre.toUpperCase(), pageWidth / 2, 30, { align: "center" });
}

// Ajouter les informations de l'école
function addSchoolInfoSection(doc: jsPDF, margin: number, schoolName: string): void {
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`École: ${schoolName}`, margin, 45);
  doc.text(`Année scolaire: ${new Date().getFullYear() - 1}-${new Date().getFullYear()}`, margin, 52);
}

// Ajouter les informations de l'élève
function addStudentInfoSection(doc: jsPDF, margin: number, student: Student, studentClass: string): void {
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Informations de l'élève", margin, 65);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Nom: ${student.last_name}`, margin, 75);
  doc.text(`Prénom: ${student.first_name}`, margin, 82);
  if (student.birth_date) {
    doc.text(`Date de naissance: ${new Date(student.birth_date).toLocaleDateString()}`, margin, 89);
  }
  doc.text(`Classe: ${studentClass}`, margin, 96);
  if (student.status) {
    doc.text(`Statut: ${student.status}`, margin, 103);
  }
}

// Ajouter le tableau des matières
function addSubjectsTable(doc: jsPDF, margin: number, subjectAverages: any[]): number {
  doc.setFont("helvetica", "bold");
  doc.text("Résultats par matière", margin, 115);
  
  const subjectRows = subjectAverages.map(subject => [
    subject.subject,
    subject.average.toFixed(2),
    subject.maxGrade.toFixed(2),
    `${subject.percentage.toFixed(2)}%`,
    getAppreciation(subject.percentage)
  ]);
  
  doc.autoTable({
    startY: 120,
    head: [["Matière", "Moyenne", "Max", "Pourcentage", "Appréciation"]],
    body: subjectRows,
    theme: "grid",
    headStyles: { fillColor: [66, 135, 245], textColor: 255 },
    margin: { left: margin, right: margin },
    styles: { overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 30, halign: 'center' },
      4: { cellWidth: 50 }
    }
  });
  
  // Retourner la position Y finale du tableau pour placer les éléments suivants
  return (doc as any).lastAutoTable.finalY + 10;
}

// Ajouter la section des résultats finaux
function addFinalResultSection(
  doc: jsPDF, 
  margin: number, 
  yPosition: number, 
  averageInfo: { overallAverage: number; percentage: number }, 
  studentFirstName: string
): void {
  doc.setFont("helvetica", "bold");
  doc.text(`Moyenne générale: ${averageInfo.overallAverage.toFixed(2)}/20`, margin, yPosition);
  doc.text(`Pourcentage: ${averageInfo.percentage.toFixed(2)}%`, margin, yPosition + 7);
  doc.text(`Appréciation globale: ${getGlobalAppreciation(averageInfo.percentage)}`, margin, yPosition + 14);
  
  // Ajouter un commentaire personnalisé
  doc.setFont("helvetica", "normal");
  doc.text("Commentaires:", margin, yPosition + 22);
  
  let comment = "";
  if (averageInfo.percentage >= 70) {
    comment = `${studentFirstName} a obtenu d'excellents résultats ce trimestre. Félicitations !`;
  } else if (averageInfo.percentage >= 50) {
    comment = `${studentFirstName} a obtenu des résultats satisfaisants. Continuez à travailler régulièrement.`;
  } else {
    comment = `${studentFirstName} doit fournir plus d'efforts et travailler plus régulièrement.`;
  }
  
  doc.text(comment, margin, yPosition + 30);
}

// Ajouter la section des signatures
function addSignatureSection(doc: jsPDF, margin: number, finalY: number, pageWidth: number): void {
  doc.setFont("helvetica", "bold");
  doc.text("Signatures:", margin, finalY + 40);
  
  doc.setFont("helvetica", "normal");
  doc.text("Directeur/trice de l'école", margin, finalY + 50);
  doc.text("Parent/Tuteur", pageWidth - margin - 50, finalY + 50);
  
  // Ajouter des lignes pour les signatures
  doc.setDrawColor(200, 200, 200);
  doc.setLineDashPattern([3, 3], 0);
  doc.line(margin, finalY + 60, margin + 70, finalY + 60);
  doc.line(pageWidth - margin - 70, finalY + 60, pageWidth - margin, finalY + 60);
}

// Ajouter le pied de page
function addFooter(doc: jsPDF, pageWidth: number): void {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Généré le ${new Date().toLocaleDateString()}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
}
