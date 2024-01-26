import React, { useState, useEffect } from 'react';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { downloadTxtFile } from '../utils';

const userHeaders = [
  'NIK',
  'Job Title',
  'Nama',
  'Divisi',
  'Unit',
]

const summaryHeaders = [
  'Total Meet Technical',
  'Total Not Meet Technical',
  'Total Meet Behavioural',
  'Total Not Meet Behavioural',
  'Percentage Meet Technical',
  'Percentage Not Meet Technical',
  'Percentage Meet Behavioural',
  'Percentage Not Meet Behavioural',
]

const subHeaders = [
  'Level Kompetensi Yang Diharapkan',
  'Level Kompetensi Yang Ditunjukkan (Dinilai oleh Kepala Divisi)',
  'Gap',
  'Status',
]

function Table({
  reports,
  divisionType,
  setIsLoading,
}) {
  if (!reports) return null

  const {
    uniqueAssociatedCompetencies,
    data,
    footers,
  } = reports

  const renderHeaders = () => {
    const numberOfCompetencies = uniqueAssociatedCompetencies.length
    return (
      <thead>
        <tr>
          {
            userHeaders.map(header => <th rowSpan={2}>{header}</th>)
          }
          {
            summaryHeaders.map(header => <th rowSpan={2}>{header}</th>)
          }
          {
            subHeaders.map(header => <th colSpan={numberOfCompetencies}>{header}</th>)
          }
        </tr>
        <tr>
          {subHeaders.map(i => {
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

  const renderFooters = () => {
    return (
      <tfoot>
        <tr>
        <th colSpan={userHeaders.length}>Total/Average</th>
          {
            footers.map(footer => <th>{footer}</th>)
          }
                    {
            subHeaders.map(header => <th colSpan={uniqueAssociatedCompetencies.length}></th>)
          }
        </tr>
      </tfoot>
    )
  }

  const createCsvHeaders = () => {
    const userHeadersLength = userHeaders.length
    const summaryHeadersLength = summaryHeaders.length
    const numberOfCompetencies = uniqueAssociatedCompetencies.length

    const firstHeaders = `,`.repeat(userHeadersLength)
      + `,`.repeat(summaryHeadersLength)
      + `Level Kompetensi Yang Diharapkan` + `,`.repeat(numberOfCompetencies)
      + `Level Kompetensi Yang Ditunjukkan (Dinilai oleh Kepala Divisi)` + `,`.repeat(numberOfCompetencies)
      + `Gap` + `,`.repeat(numberOfCompetencies)
      + `Status` + `,`.repeat(numberOfCompetencies)

    const secondHeaders = [
      ...userHeaders,
      ...summaryHeaders,
      ...subHeaders.map(i => uniqueAssociatedCompetencies).flat(),
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
      csv += userData.row.map(e => e ? `"${e}"` : "").join(',') + '\n'
    });

    // footers
    csv += [
      ...userHeaders.map(i => ''),
      ...footers,
    ].join(',') + '\n'

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
        <DownloadCsvButton
          data={createCsv()}
          filename={`reports_${divisionType}_${new Date().getTime()}.csv`}
        />
      </div>
      <table id="division-single-report" className="display nowrap" style={{ width: '1000%' }}>
        {renderHeaders()}
        {renderBody()}
        {renderFooters()}
      </table>
    </>
  );
};

export default Table