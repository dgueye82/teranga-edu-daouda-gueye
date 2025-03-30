
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";

interface ReportCardHeaderProps {
  trimestre: string;
  onPrint: () => void;
  onExportPdf: () => void;
}

const ReportCardHeader: React.FC<ReportCardHeaderProps> = ({
  trimestre,
  onPrint,
  onExportPdf,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 print:hidden">
      <h2 className="text-2xl font-bold">Bulletin de Notes - {trimestre}</h2>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onPrint}
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onExportPdf}
        >
          <FileDown className="h-4 w-4" />
          Exporter PDF
        </Button>
      </div>
    </div>
  );
};

export default ReportCardHeader;
