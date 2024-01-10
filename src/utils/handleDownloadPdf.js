import html2pdf from 'html2pdf.js';

export const handleDownloadPDF = (
  reportRef,
  filename,
) => {
  if (reportRef.current) {
    const input = reportRef.current;

    const opt = {
      margin: 10,
      filename: `${filename + '_' + new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
    };

    html2pdf().from(input).set(opt).save();
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