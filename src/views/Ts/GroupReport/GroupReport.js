import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import BaseInstructions from '../BaseInstructions';
import { setAppAnnouncements, setAppReport } from '../../../redux/appSlice';
import { fetchTsIndividualReportTable } from '../../../apis/report/fetchTsIndividualReportTable';
import { fetchTsGroupReport } from '../../../apis/report/fetchTsGroupReport';
import { downloadTxtFile } from '../../../views/Reports/utils';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import FilteredDataTable from '../../../components/FilteredDataTable';

const getCompetenciesTitle = (reports) => {
  if (reports.length === 0) return {}
  const reportTitles = { ...reports[0] }
  delete reportTitles.division;
  delete reportTitles.fullname;
  delete reportTitles.level;
  delete reportTitles.rater;

  return Object.keys(reportTitles)
}

const createColumns = (reports) => {
  const columns = [
    {
      name: <h4>Name</h4>,
      selector: row => row.fullname,
      width: '300px',
      sortable: true,
    },
    {
      name: <h4>Division</h4>,
      selector: row => row.division,
      width: '250px',
      sortable: true,
    },
    {
      name: <h4>Level</h4>,
      selector: row => row.level,
      width: '150px',
      sortable: true,
    },
    {
      name: <h4>Rated By</h4>,
      selector: row => row.rater,
      sortable: true,
    },
  ];

  const reportTitles = getCompetenciesTitle(reports)

  reportTitles.forEach(title => {
    columns.push({
      name: <h4>{title}</h4>,
      selector: row => row[title],
      width: '300px',
      sortable: true,
    })
  });

  return columns
}

const createCsv = (reports) => {
  if (reports.length === 0) return ''

  const reportTitles = getCompetenciesTitle(reports)
  const headers = `Name,Division,Level,Rated By,${reportTitles.join(',')}\n`
  let csvs = headers

  let rowBuilder = []
  reports.forEach(report => {
    rowBuilder = [] // reset
    rowBuilder.push(report.fullname)
    rowBuilder.push(report.division)
    rowBuilder.push(report.level)
    rowBuilder.push(report.rater)

    reportTitles.forEach(title => {
      rowBuilder.push(report[title])
    });

    csvs += rowBuilder.join(',') + '\n'
  });

  return csvs
}

function GroupReport() {
  const history = useHistory()
  const dispatch = useDispatch();

  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      let data = await fetchTsGroupReport()
      setReports(data)
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])


  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
      </div>
      <div className="d-flex justify-content-end m-2">
        <DownloadCsvButton
          data={createCsv(reports)}
          filename={`group_report_${new Date().getTime()}.csv`}
        />
      </div>
      <FilteredDataTable
        columns={createColumns(reports)}
        data={reports}
        filterKeys={['fullname', 'division', 'rater']}
      />
    </>
  );
};

export default GroupReport