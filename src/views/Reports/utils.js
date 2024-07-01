export const downloadTxtFile = (data, fileName) => {
  const element = document.createElement("a");
  const file = new Blob([data], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

export const arrayToCSV = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }

  const headers = Object.keys(array[0]);
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(','));

  // Add rows
  for (const row of array) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};