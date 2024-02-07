import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fireSwalError } from '../../../apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from '../../../components/Reports/UserProfile';
import FeedbackScores from './components/FeedbackScores';
import { fetchCfiIndividualReport } from '../../../apis/report/fetchCfiIndividualReport';
import { DownloadPdfButton } from '../../../components/Buttons/DownloadButtons';
import CompetencyInfoLegend from './components/CompetencyInfoLegend';
import PageBreakPrint from 'components/Reports/PageBreakPrint';
import { sortReports } from './utils';

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
  const [reportsSummary, setReportsSummary] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      const {
        user,
        reports,
        reportsSummary,
      } = await fetchCfiIndividualReport(appReports.selectedUserReport.id);

      setReviewee(user)
      setReports(sortReports(reports))
      setReportsSummary(reportsSummary)
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
            <h1>Competency Fit Index Report</h1>
            <p className="lead">Feedback for: {reviewee.fullname}</p>
          </div>
          <hr></hr>
          <Profile user={reviewee} />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h2>What is Competency Fit Index?</h2>
              <p>
                Competency Fit Index is a tool that is used to measure an individual's competency in relation to the skills necessary for their line of work. The competencies measured are technical and behavioral competencies. The Competency Fit Index assessment attempts to determine whether an employee's current competencies are appropriate for the role, and also focus on competency development (technical & behavioral) needed for the future.
              </p>
            </div>
          </div>
          <PageBreakPrint />

          <hr></hr>
          <CompetencyInfoLegend />
          <PageBreakPrint />

          <hr></hr>
          < FeedbackScores
            reports={reports}
            reportsSummary={reportsSummary}
          />
        </div>
      </div>
      {/* PDF Download Button */}
      <DownloadPdfButton
        reportRef={reportRef}
        filename={`cfi_individual_report_${reviewee.fullname.toLowerCase().replace(' ', '_')}`}
      />
    </>
  );
}

export default IndividualReport;
