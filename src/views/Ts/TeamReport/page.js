import React, { useState, useEffect } from 'react';

import { fireSwalError } from 'apis/fireSwal';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import Graph from '../IndividualReport/components/Graph';
import { fetchTsIndividualReport } from '../../../apis/report/fetchTsIndividualReport';
import { TeamReportPdfButton, BulkTeamReportDownloadButton } from './components/TeamReportPdfButton';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from '../../../components/Reports/UserProfile';
import { fetchTsTeamReport } from 'apis/report/fetchTsTeamReport';

function TeamReport() {
  const authUser = useSelector(state => state.auth.user);
  const appReports = useSelector(state => state.app.reports);

  const [reviewee, setReviewee] = useState({
    nik: '',
    fullname: '',
    email: ''
  })
  const [reports, setReports] = useState([])
  const [essayReports, setEssayReports] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      const {
        reviewee,
        reports,
        essayReports,
      } = await fetchTsTeamReport(appReports.selectedUserReport.id);

      setReviewee(reviewee)
      setReports(reports)
      setEssayReports(essayReports)
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, []);

  if (isLoading) {
    return < LoadingSpinner />
  }

  return (
    <>
      <div className="container mt-4">
        <div className="container mt-4">
          <div className="text-center mb-4">
            <h1>360 Degree Team Report</h1>
            <p className="lead">{reviewee.level === 'Kepala Divisi' ? 'Divisi ' + reviewee.division : 'Direktorat ' + reviewee.directorate}</p>
          </div>
          <hr></hr>

          {/* Description of 360 Feedback */}
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h2>What is 360-degree Feedback?</h2>
              <p>
                360-degree feedback is a process in which an individual receives feedback
                from multiple sources, including peers, managers, subordinates, and other
                stakeholders. This comprehensive feedback allows the individual to gain
                insights into their strengths and areas for improvement from different
                perspectives.
              </p>
            </div>
          </div>
          <hr></hr>

          <Graph reports={reports} />
        </div>
      </div>
      <TeamReportPdfButton
        reviewee={reviewee}
        reports={reports}
        buttonText="Download PDF"
      />
      <BulkTeamReportDownloadButton />
    </>
  );
}

export default TeamReport;
