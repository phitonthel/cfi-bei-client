import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { fetchTsIndividualReport } from '../../../apis/report/fetchTsIndividualReport';
import { fireSwalError } from '../../../apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from '../../../components/Reports/UserProfile';
import FeedbackScores from './components/FeedbackScores';
import { fetchCfiIndividualReport } from '../../../apis/report/fetchCfiIndividualReport';
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      const {
        user,
        reports,
      } = await fetchCfiIndividualReport(appReports.selectedUserReport.id);

      setReviewee(user)
      setReports(reports)
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
                It is a vital tool used to match an individual's skills and abilities with the specific needs of a role or task. It assesses various competencies, including technical and behavioral skills, to ensure optimal alignment in recruitment, promotions, and team assignments.
              </p>
            </div>
          </div>

          <hr></hr>
          < FeedbackScores reports={reports} />
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
