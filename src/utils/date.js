export const convertISODateToDDMMYYYY = (isoString) => {
  if (!isoString) {
    return '-'
  }
  
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 based in JavaScript
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export const formatISODateToMonthYear = (isoDate) => {
  const date = new Date(isoDate);
  
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}