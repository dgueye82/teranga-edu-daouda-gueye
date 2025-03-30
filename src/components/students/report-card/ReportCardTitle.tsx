
import React from "react";

interface ReportCardTitleProps {
  trimestre: string;
}

const ReportCardTitle: React.FC<ReportCardTitleProps> = ({ trimestre }) => {
  return (
    <div className="text-center print:text-center">
      <h1 className="text-xl font-bold uppercase print:text-xl">Bulletin de Notes</h1>
      <h2 className="text-lg font-semibold print:text-lg">{trimestre}</h2>
      <p>Année scolaire {new Date().getFullYear() - 1}-{new Date().getFullYear()}</p>
    </div>
  );
};

export default ReportCardTitle;
