
import React from "react";

const PrintStyles: React.FC = () => {
  return (
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
  );
};

export default PrintStyles;
