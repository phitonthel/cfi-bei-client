export const usersHeaders = {
  nik: 'NIK',
  fullname: 'Name',
  directorate: 'Directorate',
  division: 'Division',
  unit: 'Unit',
  positionName: 'Position',
  level: 'Level',
  location: 'Location',
}

export const summaryHeaders = {
  'Number of Technical Meet': 'Number of Technical Meet',
  'Number of Technical Need Development': 'Number of Technical Need Development',
  'Percentage of Technical Meet': 'Percentage of Technical Meet',
  'Percentage of Technical Need Development': 'Percentage of Technical Need Development',
  'Number of Behavioural Meet': 'Number of Behavioural Meet',
  'Number of Behavioural Need Development': 'Number of Behavioural Need Development',
  'Percentage of Behavioural Meet': 'Percentage of Behavioural Meet',
  'Percentage of Behavioural Need Development': 'Percentage of Behavioural Need Development',
}

export const subCompetencyHeaders = {
  'Expected Score': 'Expected Score',
  'Validated Score': 'Validated Score',
  'Gap': 'Gap',
  'Status': 'Status',
}

export const createCsv = (baseCsv, rowsValues) => {
  // let csv = createCsvHeaders()

  rowsValues.forEach(rowValues => {
    baseCsv += rowValues
      .map(e => e || e === 0 ? `"${e}"` : "")
      .join(',') + '\n'
  });

  baseCsv += [
    ...Object.values(usersHeaders).map(i => ''),
    calculateCsvSum(rowsValues, 8),
    calculateCsvSum(rowsValues, 9),
    (calculateCsvSum(rowsValues, 10) / rowsValues.length).toFixed(2),
    (calculateCsvSum(rowsValues, 11) / rowsValues.length).toFixed(2),
    calculateCsvSum(rowsValues, 12),
    calculateCsvSum(rowsValues, 13),
    (calculateCsvSum(rowsValues, 14) / rowsValues.length).toFixed(2),
    (calculateCsvSum(rowsValues, 15) / rowsValues.length).toFixed(2),
  ].join(',') + '\n'

  return baseCsv
}

export const createCsvHeaders = (behaHeadersCsv, techHeadersCsv, competencies) => {
  const COL_PER_COMPETENCY = 4
  const MAIN_COL = Object.values(usersHeaders).length + Object.values(summaryHeaders).length

  const firstHeaders = `,`.repeat(MAIN_COL)
    + `Behavioural` + `,`.repeat(behaHeadersCsv.length * COL_PER_COMPETENCY)
    + `Technical` + `,`.repeat(techHeadersCsv.length * COL_PER_COMPETENCY)

  const secondHeaders = `,`.repeat(MAIN_COL)
    + behaHeadersCsv.map(header => {
      if (header) return header + `,`.repeat(COL_PER_COMPETENCY)
      return `,`.repeat(COL_PER_COMPETENCY)
    }).join('')

  const thirdHeader = `,`.repeat(MAIN_COL)
    + competencies.map(c => {
      return c.title + `,`.repeat(COL_PER_COMPETENCY)
    }).join('')

  const fourthHeader = [
    ...Object.values(usersHeaders),
    ...Object.values(summaryHeaders),
    ...competencies.map(c => {
      return Object.values(subCompetencyHeaders)
    })
  ].join(',') + ','

  return [
    firstHeaders,
    secondHeaders,
    thirdHeader,
    fourthHeader,
  ].join('\n') + '\n'
}

const calculateCsvSum = (rows, colIndex) => {
  return rows.reduce((acc, row) => {
    return acc + parseFloat(row[colIndex])
  }, 0)
}