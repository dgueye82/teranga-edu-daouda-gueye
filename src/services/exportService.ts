
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Student, StudentPerformance } from "@/types/student";

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
  const contentWidth = pageWidth - 2 * margin;
  
  // Extraire la classe de l'élève depuis les notes
  const studentClass = student.notes || "Non spécifiée";
  // S'assurer que l'école est bien affichée
  const schoolName = student.school_name || "Non spécifiée";
  
  // Ajouter le titre
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BULLETIN DE NOTES", pageWidth / 2, 20, { align: "center" });
  doc.text(trimestre.toUpperCase(), pageWidth / 2, 30, { align: "center" });
  
  // Informations de l'école
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`École: ${schoolName}`, margin, 45);
  doc.text(`Année scolaire: ${new Date().getFullYear() - 1}-${new Date().getFullYear()}`, margin, 52);
  
  // Informations de l'élève
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
  
  // Tableau des résultats par matière
  doc.setFont("helvetica", "bold");
  doc.text("Résultats par matière", margin, 115);
  
  const subjectRows = averageInfo.subjectAverages.map(subject => [
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
  
  // Moyenne générale
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Moyenne générale: ${averageInfo.overallAverage.toFixed(2)}/20`, margin, finalY);
  doc.text(`Pourcentage: ${averageInfo.percentage.toFixed(2)}%`, margin, finalY + 7);
  doc.text(`Appréciation globale: ${getGlobalAppreciation(averageInfo.percentage)}`, margin, finalY + 14);
  
  // Signatures
  doc.text("Signatures:", margin, finalY + 30);
  
  doc.setFont("helvetica", "normal");
  doc.text("Directeur/trice de l'école", margin, finalY + 45);
  doc.text("Parent/Tuteur", pageWidth - margin - 50, finalY + 45);
  
  // Pied de page
  doc.setFontSize(10);
  doc.text(`Généré le ${new Date().toLocaleDateString()}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
  
  // Télécharger le PDF
  doc.save(`bulletin_${student.last_name}_${student.first_name}_${trimestre.replace(/\s+/g, "_")}.pdf`);
};

// Fonction pour déterminer l'appréciation selon le pourcentage
function getAppreciation(percentage: number): string {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Très bien";
  if (percentage >= 70) return "Bien";
  if (percentage >= 60) return "Assez bien";
  if (percentage >= 50) return "Passable";
  return "Insuffisant";
}

// Fonction pour déterminer l'appréciation globale
function getGlobalAppreciation(percentage: number): string {
  if (percentage >= 90) return "Félicitations";
  if (percentage >= 80) return "Compliments du conseil de classe";
  if (percentage >= 70) return "Tableau d'honneur";
  if (percentage >= 60) return "Encouragements";
  if (percentage >= 50) return "Doit faire plus d'efforts";
  return "Travail insuffisant";
}
