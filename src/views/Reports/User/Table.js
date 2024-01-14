import React, { useState, useEffect } from 'react';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { downloadTxtFile } from '../utils';

// import { data } from './data'

const usersHeaders = [
  'NIK',
  'Name',
  'Unit',
  'Position',
  'Division',
  'Directorate',
]

const summaryHeaders = [
  'Number of Technical Meet',
  'Number of Technical Need Development',
  'Percentage of Technical Meet',
  'Percentage of Technical Need Development',
  'Number of Behavioural Meet',
  'Number of Behavioural Need Development',
  'Percentage of Behavioural Meet',
  'Percentage of Behavioural Need Development',
]

const subCompetencyHeaders = [
  'Expected Score',
  'Actual Score',
  'Gap',
  'Status'
]

function Table({ reports, setIsLoading }) {
  if (!reports) return null

  const {
    behaHeadersHtml,
    techHeadersHtml,
    behaHeadersCsv,
    techHeadersCsv,
    competencies,
    rows,
  } = reports

  const renderHeaders = () => {
    const COL_PER_COMPETENCY = subCompetencyHeaders.length
    return (
      <thead>
        <tr>
          {
            usersHeaders.map(e => <th rowSpan={4}>{e}</th>)
          }

          {
            summaryHeaders.map(e => <th rowSpan={4}>{e}</th>)
          }

          <th colSpan={behaHeadersCsv.length * COL_PER_COMPETENCY}>Behavioural</th>
          <th colSpan={techHeadersCsv.length * COL_PER_COMPETENCY}>Technical</th>
        </tr>
        <tr>
          {behaHeadersHtml.map(e => <th colSpan={e.colSpan * COL_PER_COMPETENCY}>{e.name}</th>)}
          {techHeadersHtml.map(e => <th colSpan={e.colSpan * COL_PER_COMPETENCY}>{e.name}</th>)}
        </tr>
        <tr>
          {competencies.map(e => <th colSpan={COL_PER_COMPETENCY}>{e.title}</th>)}
        </tr>
        <tr>
          {competencies.map(e => <>
            {
              subCompetencyHeaders.map(e => <th>{e}</th>)
            }
          </>)}
        </tr>
      </thead>
    )
  }

  const renderBody = () => {
    const body = []
    rows.forEach(user => {
      const rowHtml = user.map(col => <td>{col}</td>)
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
    const MAIN_COL = usersHeaders.length + summaryHeaders.length

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
      ...usersHeaders,
      ...summaryHeaders,
      ...competencies.map(c => {
        return subCompetencyHeaders
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
    let headers = createCsvHeaders()

    rows.forEach(row => {
      headers += row.join(',') + '\n'
    });

    return headers
  }

  const renderTable = () => {
    $('#user-report').DataTable({
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
          filename={`reports_users_${new Date().getTime()}.csv`}
        />
      </div>
      <table id="user-report" className="display nowrap" style={{ width: '1000%' }}>
        {renderHeaders()}
        {renderBody()}
        <tfoot>
        </tfoot>
      </table>
    </>
  );
};

export default Table