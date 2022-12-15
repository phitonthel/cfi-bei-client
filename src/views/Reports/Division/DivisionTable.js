import React, { useState, useEffect } from 'react';

import { dataFactory } from './dataFactory'
// import { data } from './data'

const Table = ({ 
  data,
  setIsConvertedToDataTable,
  setLoading
}) => {
  if (data.length === 0) return null

  const createHeaders = (data) => {
    const competencies = Object.keys(data[0].competencies)

    let firstHeader = `,,,`
    competencies.forEach(competency => {
      firstHeader += `${competency},,,,`
    });

    let secondHeader = `,,,`
    competencies.forEach(() => {
      secondHeader += "Meet,,Not Meet,,"
    });

    let thirdHeader = `No,Divisi,Jumlah Karyawan,`
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
    const headers = createHeaders(data)

    let rows = ``
    createRows(data).forEach(row => {
      rows += row.join(',')
      rows += '\n'
    });

    return headers + rows
  }

  const downloadTxtFile = (data) => {
    const element = document.createElement("a");
    const file = new Blob([createCsv(data)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "report.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const renderTable = () => {
    $('#division-all-report').DataTable({
      dom: 'frtip',
      scrollX: true,
    });
  }

  useEffect(async () => {
    renderTable()
    setIsConvertedToDataTable(true)
    setLoading(false)
  }, [])

  const rows = renderRows(data)

  return (
    <>
      <div className="d-flex flex-row-reverse">
        <button
          className='btn btn-primary btn-sm m-1'
          onClick={() => downloadTxtFile(data)}>
          Download CSV
        </button>
      </div>
      <table id="division-all-report" className="display nowrap" style={{ width: '200%' }}>
        {
          renderHeaders(data)
        }
        {
          rows
        }
        <tfoot>
        </tfoot>
      </table></>
  );
};

export default Table