import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import CardBreakdown from './components/CardBreakdown'
import { fetchTsIndividualReport } from '../../../apis/report/fetchTsIndividualReport';
import OpenFeedbacks from './components/OpenFeedbacks';
import Graph from './components/Graph';
import { fireSwalError } from 'apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from '../../../components/Reports/UserProfile';
import FeedbackScores from './components/FeedbackScores';
import PageBreakPrint from '../../../components/Reports/PageBreakPrint';
import { handleDownloadPDF } from '../../../utils/handleDownloadPdf';
import { DownloadPdfButton } from '../../../components/Buttons/DownloadButtons';


function IndividualReport() {
  const reportRef = useRef(null);
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
      } = await fetchTsIndividualReport(appReports.selectedUserReport.id);

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
      <div className="container mt-4" ref={reportRef}>
        <div className="container mt-4">
          <div className="text-center mb-4">
            <h1>360 Degree Feedback Report</h1>
            <p className="lead">Feedback for: {reviewee.fullname}</p>
          </div>
          <hr></hr>

          < Profile user={reviewee} />
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
          <hr></hr>
          <PageBreakPrint />

          <div className="mb-4 p-4">
            <h2>Feedback Scores</h2>
            <div>
              < FeedbackScores reports={reports} />
            </div>
          </div>
          <hr></hr>
          <PageBreakPrint />

          <OpenFeedbacks essayReports={essayReports} />
        </div>
      </div>
      <DownloadPdfButton
        reportRef={reportRef}
        filename={`360_individual_report_${reviewee.fullname.toLowerCase().replace(' ', '_')}`}
      />
    </>
  );
}

export default IndividualReport;
