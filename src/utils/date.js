export const convertISODateToDDMMYYYY = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 based in JavaScript
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
