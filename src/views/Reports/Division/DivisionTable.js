import React, { useState, useEffect } from 'react';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { downloadTxtFile } from '../utils';

import { dataFactory } from './dataFactory'
// import { data } from './data'

const Table = ({
  data,
  setIsLoading
}) => {
  if (!data) return null

  const createCsvHeaders = (data) => {
    const MAIN_COL = 6

    const competencies = Object.keys(data[0].competencies)

    let firstHeader = `,`.repeat(MAIN_COL)
    competencies.forEach(competency => {
      firstHeader += `${competency},,,,`
    });

    let secondHeader = `,`.repeat(MAIN_COL)
    competencies.forEach(() => {
      secondHeader += "Meet,,Not Meet,,"
    });

    let thirdHeader = `No,Divisi,Jumlah Karyawan,Jumlah Kompetensi Per Divisi,Average Meet Kompetensi Divisi,Average Not Meet Kompetensi Divisi,`
    competencies.forEach(() => {
      thirdHeader += "Jumlah Karyawan,Persentase,Jumlah Karyawan,Persentase,"
    });

    return firstHeader + '\n' + secondHeader + '\n' + thirdHeader + '\n'
  }

  const createRows = (data) => {
    return data.map((row, i) => {
      const competencies = Object.keys(row.competencies)
      const rowArr = []

      rowArr.push(i + 1)
      rowArr.push(row.divisionName)
      rowArr.push(row.numberOfStaff)
      rowArr.push(row.totalCompetencies)
      rowArr.push(row.avgMeetPercentage)
      rowArr.push(row.avgNotMeetPercentage)
      competencies.forEach(competency => {
        rowArr.push(row.competencies[competency].meet.numberOfStaff)
        rowArr.push(row.competencies[competency].meet.percentage)
        rowArr.push(row.competencies[competency].notMeet.numberOfStaff)
        rowArr.push(row.competencies[competency].notMeet.percentage)
      });

      return rowArr
    })
  }

  const renderHeaders = (data) => {
    const competencies = Object.keys(data[0].competencies)

    return (
      <thead>
        <tr>
          <th rowSpan={3}>No</th>
          <th rowSpan={3}>Divisi</th>
          <th rowSpan={3}>Jumlah Karyawan</th>
          <th rowSpan={3}>Jumlah Kompetensi Per Divisi</th>
          <th rowSpan={3}>Average Meet Kompetensi Divisi</th>
          <th rowSpan={3}>Average Not Meet Kompetensi Divisi</th>
          {
            competencies.map(competency =>
              <th colSpan={4} key={competency}>Kompetensi {competency}</th>
            )
          }
        </tr>
        <tr>
          {
            competencies.map((competency) =>
              <React.Fragment key={`${competency}_meet`}>
                <th colSpan={2}>Meet</th>
                <th colSpan={2}>Not Meet</th>
              </React.Fragment>
            )
          }
        </tr>
        <tr>
          {
            competencies.map((competency) =>
              <React.Fragment key={`${competency}_percentage`}>
                <th>Jumlah Karyawan</th>
                <th>Persentase</th>
                <th>Jumlah Karyawan</th>
                <th>Persentase</th>
              </React.Fragment>
            )
          }
        </tr>
      </thead>
    )
  }

  const renderRows = (data) => {
    const rows = createRows(data)
    const renderedRows = rows.map((row, i) => {
      return (
        <tr key={i}>
          {row.map((col, j) => (
            <td key={`${i}_${j}`}>{col}</td>
          ))}
        </tr>
      )
    })

    return <tbody>
      {renderedRows}
    </tbody>
  }

  const createCsv = (data) => {
    const headers = createCsvHeaders(data)

    let rows = ``
    createRows(data).forEach(row => {
      rows += row.join(',')
      rows += '\n'
    });

    return headers + rows
  }

  const renderTable = () => {
    $('#division-all-report').DataTable({
      dom: 'frtip',
      scrollX: true,
    });
  }

  useEffect(async () => {
    renderTable()
    setIsLoading(false)
  }, [])

  return (
    <>
      <div className="d-flex justify-content-end m-2">
        <DownloadCsvButton
          data={createCsv(data)}
          filename={`reports_division_all_${new Date().getTime()}.csv`}
        />
      </div>
      <table id="division-all-report" className="display nowrap" style={{ width: '200%' }}>
        {renderHeaders(data)}
        {renderRows(data)}
        <tfoot>
        </tfoot>
      </table></>
  );
};

export default Table