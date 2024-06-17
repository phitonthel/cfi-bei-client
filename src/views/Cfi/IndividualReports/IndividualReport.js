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
import PageBreakPrint from '../../../components/Reports/PageBreakPrint';
import { sortReports } from './utils';
import Justification from './components/Justification';
import Content from './components/Content';

const divideArray = (array, parts) => {
  let result = [];
  let partSize = Math.floor(array.length / parts);
  let remainder = array.length % parts;

  let start = 0;

  for (let i = 0; i < parts; i++) {
    let end = start + partSize + (remainder > 0 ? 1 : 0);
    result.push(array.slice(start, end));
    start = end;
    if (remainder > 0) remainder--;
  }

  return result;
}

function IndividualReport() {
  const reportRef = useRef(null);
  const authUser = useSelector(state => state.auth.user);
  const appReports = useSelector(state => state.app.reports);
  const appUtilities = useSelector(state => state.app.utilities);

  const [reviewee, setReviewee] = useState({
    nik: '',
    fullname: '',
    email: ''
  })
  const [reports, setReports] = useState([])
  const [reportsSummary, setReportsSummary] = useState({})
  const [reportJustifications, setReportJustifications] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      const {
        user,
        reports,
        reportsSummary,
        reportJustifications,
      } = await fetchCfiIndividualReport({
        userId: appReports.selectedUserReport.id,
        cfiTypeAssessmentId: appUtilities.cfiTypeAssessment.id,
      });

      setReviewee(user)
      setReports(sortReports(reports))
      setReportsSummary(reportsSummary)
      setReportJustifications(reportJustifications)
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
      <DownloadPdfButton
        reportRef={reportRef}
        filename={`cfi_individual_report_${reviewee.fullname.toLowerCase().replaceAll(' ', '_')}`}
        buttonText={`Download Report PDF`}
      />
      <div style={{ marginTop: 50}}/>
      <hr></hr>
      <div>
        <Content
          reviewee={reviewee}
          reports={reports}
          reportsSummary={reportsSummary}
          reportJustifications={reportJustifications}
          isForPrint={false}
        />
      </div>

      {/* FOR PRINT ONLY */}
      <div style={{ display: 'none' }}>
        <div ref={reportRef}>
          <Content
            reviewee={reviewee}
            reports={reports}
            reportsSummary={reportsSummary}
            reportJustifications={reportJustifications}
            isForPrint={true}
          />
        </div>
      </div>
    </>
  );
}

export default IndividualReport;
