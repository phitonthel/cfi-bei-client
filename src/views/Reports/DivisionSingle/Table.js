import React, { useState, useEffect } from 'react';
import { DownloadButton } from '../../../components/DownloadButton';
import { downloadTxtFile } from '../utils';

// import { data } from './data'

function Table({
  reports,
  divisionType,
  setIsLoading,
}) {
  if (!reports) return null

  const {
    uniqueAssociatedCompetencies,
    data,
  } = reports

  const renderHeaders = () => {
    const numberOfCompetencies = uniqueAssociatedCompetencies.length
    return (
      <thead>
        <tr>
          <th rowSpan={2}>NIK</th>
          <th rowSpan={2}>Job Title</th>
          <th rowSpan={2}>Nama</th>
          <th rowSpan={2}>Divisi</th>
          <th rowSpan={2}>Unit</th>
          <th rowSpan={2}>Total Meet Technical</th>
          <th rowSpan={2}>Total Not Meet Technical</th>
          <th rowSpan={2}>Total Meet Behavioural</th>
          <th rowSpan={2}>Total Not Meet Behavioural</th>
          <th colSpan={numberOfCompetencies}>Level Kompetensi Yang Diharapkan</th>
          <th colSpan={numberOfCompetencies}>Level Kompetensi Yang Ditunjukkan (Dinilai oleh Kepala Divisi) | Jika Tidak Diisi Oleh Atasan, Maka Nilai Diambil Oleh Bawahan. Jika Keduanya Tidak Mengisi, Maka Nol</th>
          <th colSpan={numberOfCompetencies}>Gap</th>
          <th colSpan={numberOfCompetencies}>Status</th>
        </tr>
        <tr>
          {[1, 2, 3, 4].map(i => {
            return uniqueAssociatedCompetencies.map(competency => {
              return (
                <th>{competency}</th>
              )
            })
          })}
        </tr>
      </thead>
    )
  }

  const renderBody = () => {
    const body = []
    data.forEach(element => {
      const rowHtml = element.row.map(col => <td>{col}</td>)
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
    const MAIN_COL = 5
    const SECONDARY_COL = 4
    const numberOfCompetencies = uniqueAssociatedCompetencies.length

    const firstHeaders = `,`.repeat(MAIN_COL)
      + `,`.repeat(SECONDARY_COL)
      + `Level Kompetensi Yang Diharapkan` + `,`.repeat(numberOfCompetencies)
      + `Level Kompetensi Yang Ditunjukkan (Dinilai oleh Kepala Divisi)` + `,`.repeat(numberOfCompetencies)
      + `Gap` + `,`.repeat(numberOfCompetencies)
      + `Status` + `,`.repeat(numberOfCompetencies)

    const secondHeaders = [
      'NIK',
      'Job Title',
      'Nama',
      'Divisi',
      'Unit',
      'Total Meet Technical',
      'Total Not Meet Technical',
      'Total Meet Behavioural',
      'Total Not Meet Behavioural',
      ...uniqueAssociatedCompetencies,
      ...uniqueAssociatedCompetencies,
      ...uniqueAssociatedCompetencies,
      ...uniqueAssociatedCompetencies,
    ]

    return {
      firstHeaders,
      secondHeaders,
    }
  }

  const createCsv = () => {
    const {
      firstHeaders,
      secondHeaders,
    } = createCsvHeaders()

    let csv = firstHeaders + '\n' + secondHeaders + '\n'

    reports.data.forEach(userData => {
      csv += userData.row.join(',') + '\n'
    });

    return csv
  }

  const renderTable = () => {
    $('#division-single-report').DataTable({
      dom: 'frtip',
      scrollX: true,
      pageLength: 10,
    });
  }

  useEffect(async () => {
    renderTable()
    setIsLoading(false)
  }, [reports])

  return (
    <>
      <div className="d-flex justify-content-end m-2">
        <DownloadButton
          data={createCsv()}
          filename={`reports_${divisionType}_${new Date().getTime()}.csv`}
        />
      </div>
      <table id="division-single-report" className="display nowrap" style={{ width: '1000%' }}>
        {renderHeaders()}
        {renderBody()}
        <tfoot>
        </tfoot>
      </table>
    </>
  );
};

export default Table