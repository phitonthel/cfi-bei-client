import { fireSwalError } from '../apis/fireSwal';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

export const handleDownloadPDF = async (
  reportRef,
  filename,
) => {
  try {
    if (reportRef.current) {
      const input = reportRef.current;

      const opt = {
        margin: 10,
        filename: `${filename + '_' + new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        pagebreak: {
          // avoid: "tr", 
          // mode: ['avoid-all', 'css'],
          // before: "#nextpage1", 
          after: ['#pagebreakprint']
        },
        html2canvas: { scale: 1.5 },
        jsPDF: {
          unit: 'mm',
          format: 'a3',
          // format: [300, 630],
          orientation: 'portrait',
          // compress: true,
        },
      };

      await html2pdf().from(input).set(opt).save();
    }
  } catch (error) {
    const newError = new Error('File exceeds the maximum size limit. Please try with another browser or contact admin.');
    fireSwalError(newError, 3000);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
};

export const handleDownloadPDFV2 = (
  reportRef,
  filename,
) => {
  if (reportRef.current) {
    const input = reportRef.current;
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.html(input, {
      callback: (doc) => {
        doc.save(`${filename}_${new Date().getTime()}.pdf`);
      },
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10,
      html2canvas: { scale: 0.15 }, // Adjust scale if needed
    });
  }
};

export const handleDownloadPDFOnePage = (
  reportRef,
  filename
) => {
  if (reportRef.current) {
    const input = reportRef.current;

    // Measure the content height
    const contentHeight = input.scrollHeight + 200;
    const contentWidth = input.scrollWidth + 200;

    // Convert height to mm at 96 DPI (1 inch = 25.4 mm, 1 inch = 96 pixels)
    const heightInMM = (contentHeight * 25.4) / 96;
    const widthInMM = (contentWidth * 25.4) / 96;

    const opt = {
      margin: 10,
      filename: `${filename + '_' + new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: [widthInMM, heightInMM], orientation: 'portrait' },
    };

    html2pdf().from(input).set(opt).save();
  }
};