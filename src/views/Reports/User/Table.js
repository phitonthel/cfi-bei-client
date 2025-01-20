import React, { useState, useEffect } from 'react';

import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { filterData, FilterSearchBar } from '../../../components/FilterSearchBar';
import { getPaginatedData, Pagination } from '../../../components/Table/Pagination';
import { downloadTxtFile } from '../utils';
import { usersHeaders, summaryHeaders, subCompetencyHeaders, createCsv, createCsvHeaders } from './utils';
import SearchableDropdown from '../../../components/SearchableDropdown';

// import { data } from './data'

const Table = ({ reports, orgHierarchies, onUrlChange }) => {
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
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filterOptions = [
    ...orgHierarchies.directorates.map(d => ({ name: d, type: 'directorate', value: d })),
    ...orgHierarchies.divisions.map(d => ({ name: `Divisi ${d}`, type: 'division', value: d })),
    ...orgHierarchies.units.map(u => ({ name: `Unit ${u}`, type: 'unit', value: u })),
  ]

  // button
  const handleFilterChange = (selectedValue) => {
    setSelectedFilter(selectedValue);
    onUrlChange(selectedValue);
    console.log('Selected Filter:', selectedValue);
  };

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

  useEffect(async () => {
  }, [])

  return (
    <>
      <div className="d-flex justify-content-end m-2">
        <SearchableDropdown
          items={filterOptions}
          field="name"
          onChange={handleFilterChange}
          selected={selectedFilter || {}}
          buttonText="Filter Hierarchy"
          size="sm"
        />
        <DownloadCsvButton
          // data={createCsv()}
          data={createCsv(
            createCsvHeaders(
              behaHeadersCsv,
              techHeadersCsv,
              competencies
            ),
            rowsValues
          )}
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