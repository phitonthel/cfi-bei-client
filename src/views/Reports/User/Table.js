import React, { useState, useEffect } from 'react';
import { DownloadButton } from '../../../components/DownloadButton';
import { downloadTxtFile } from '../utils';

// import { data } from './data'

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
    const COL_PER_COMPETENCY = 4
    return (
      <thead>
        <tr>
          <th rowSpan={4}>NIK</th>
          <th rowSpan={4}>Name</th>
          <th rowSpan={4}>Unit</th>
          <th rowSpan={4}>Position</th>
          <th rowSpan={4}>Division</th>
          <th rowSpan={4}>Directorate</th>
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
            <th>Expected Score</th>
            <th>Actual Score</th>
            <th>Gap</th>
            <th>Status</th>
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
    const MAIN_COL = 6

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

    const fourthHeader = `NIK,Name,Unit,Position,Division,Directorate,`
      + competencies.map(c => {
        return `Expected Score,Actual Score,Gap,Status,`
      }).join('')

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
      <DownloadButton
        onClick={() => downloadTxtFile(
          createCsv(),
          `reports_users_${new Date().getTime()}.csv`
        )}
      />
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