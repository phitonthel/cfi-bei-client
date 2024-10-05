import React, { useState, useEffect } from 'react';

import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { filterData, FilterSearchBar } from '../../../components/FilterSearchBar';
import { getPaginatedData, Pagination } from '../../../components/Table/Pagination';
import { downloadTxtFile } from '../utils';

// import { data } from './data'

const usersHeaders = {
  nik: 'NIK',
  fullname: 'Name',
  directorate: 'Directorate',
  division: 'Division',
  unit: 'Unit',
  positionName: 'Position',
  level: 'Level',
  location: 'Location',
}

const summaryHeaders = {
  'Number of Technical Meet': 'Number of Technical Meet',
  'Number of Technical Need Development': 'Number of Technical Need Development',
  'Percentage of Technical Meet': 'Percentage of Technical Meet',
  'Percentage of Technical Need Development': 'Percentage of Technical Need Development',
  'Number of Behavioural Meet': 'Number of Behavioural Meet',
  'Number of Behavioural Need Development': 'Number of Behavioural Need Development',
  'Percentage of Behavioural Meet': 'Percentage of Behavioural Meet',
  'Percentage of Behavioural Need Development': 'Percentage of Behavioural Need Development',
}

const subCompetencyHeaders = {
  'Expected Score': 'Expected Score',
  'Validated Score': 'Validated Score',
  'Gap': 'Gap',
  'Status': 'Status',
}

const Table = ({ reports }) => {
  const {
    behaHeadersHtml,
    techHeadersHtml,
    behaHeadersCsv,
    techHeadersCsv,
    competencies,
    rows,
  } = reports

  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = event => {
    const { value } = event.target;
    setCurrentPage(1)
    setFilterText(value);
  };

  // search format is key:value1,value2
  // ie Position:Kepala Divisi,Expert
  const searchText = filterText.split(':')[1] ?? filterText
  const filterHeader = filterText.split(':')[0] ?? ''
  const filterKey = Object.keys(usersHeaders).find(key => usersHeaders[key].toLowerCase() === filterHeader.toLowerCase())
  const rowsValues = filterText === ''
    ? rows.map(row => Object.values(row))
    : filterData({
      rows,
      filterKeys: filterKey
        ? [filterKey]
        : ['fullname', 'unit'],
      searchArr: searchText.split(','),
    }).map(row => Object.values(row))

  const renderHeaders = () => {
    const COL_PER_COMPETENCY = Object.values(subCompetencyHeaders).length
    return (
      <thead>
        <tr>
          {
            Object.values(usersHeaders).map((e, index) =>
              <th rowSpan={4} style={{ fontSize: '16px', minWidth: index === 0 ? "300px" : "600px" }}>
                {e}
              </th>
            )
          }

          {
            Object.values(summaryHeaders).map(e => <th rowSpan={4} style={{ fontSize: '16px', minWidth: "400px" }}>{e}</th>)
          }

          <th colSpan={behaHeadersCsv.length * COL_PER_COMPETENCY} style={{ fontSize: '20px' }}>Behavioural</th>
          <th colSpan={techHeadersCsv.length * COL_PER_COMPETENCY} style={{ fontSize: '20px' }}>Technical</th>
        </tr>
        <tr>
          {behaHeadersHtml.map(e => <th colSpan={e.colSpan * COL_PER_COMPETENCY} style={{ fontSize: '16px' }}>{e.name}</th>)}
          {techHeadersHtml.map(e => <th colSpan={e.colSpan * COL_PER_COMPETENCY} style={{ fontSize: '16px' }}>{e.name}</th>)}
        </tr>
        <tr>
          {competencies.map((e) =>
            <th
              colSpan={COL_PER_COMPETENCY}
              style={{ fontSize: '14px' }}
            >
              {e.title}
            </th>
          )}
        </tr>
        <tr>
          {competencies.map(e => <>
            {
              Object.values(subCompetencyHeaders).map(e =>
                <th style={{ minWidth: e === subCompetencyHeaders.Status ? '200px' : undefined }}>
                  {e}
                </th>)
            }
          </>)}
        </tr>
      </thead>
    )
  }

  const renderBody = () => {
    const body = []
    getPaginatedData({
      rows: rowsValues,
      currentPage,
    }).forEach(rowValues => {
      const rowHtml = rowValues.map(col => <td>{col}</td>)
      body.push(
        <tr>
          {rowHtml}
        </tr>
      )
    });
    return (
      <tbody>
        {body}
      </tbody>
    )
  }

  const createCsvHeaders = () => {
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

  const createCsv = () => {
    let csv = createCsvHeaders()

    rowsValues.forEach(rowValues => {
      csv += rowValues
        .map(e => e || e === 0 ? `"${e}"` : "")
        .join(',') + '\n'
    });

    csv += [
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

    return csv
  }

  const calculateCsvSum = (rows, colIndex) => {
    return rows.reduce((acc, row) => {
      return acc + parseFloat(row[colIndex])
    }, 0)
  }

  useEffect(async () => {
  }, [])

  return (
    <>
      <div className="d-flex justify-content-end m-2">
        <DownloadCsvButton
          data={createCsv()}
          filename={`reports_users_${new Date().getTime()}.csv`}
        />
      </div>
      <div>
        <FilterSearchBar
          onFilter={handleFilter}
          filterText={filterText}
        />
      </div>
      <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
        {/* style={{ width: '40000px' }} */}
        {/* style={{ tableLayout: "auto", width: "100%" }} */}
        <table id="user-report" className="table table-striped" style={{ tableLayout: "auto", width: "100%" }}>
          {renderHeaders()}
          {renderBody()}
          <tfoot>
          </tfoot>
        </table>
        <div className='mb-2'>
          {/* Showing maximum of {ITEMS_PER_PAGE} entries. Use the search bar for additional queries. */}
        </div>
      </div>
      < Pagination
        rows={rowsValues}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Table