import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { fetchTsIndividualReport } from '../../../apis/report/fetchTsIndividualReport';
import { fireSwalError } from 'apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from './components/Profile';
import FeedbackScores from './components/FeedbackScores';
import { data } from './dummy'

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

  const handleDownloadPDF = () => {
    if (reportRef.current) {
      const input = reportRef.current;

      const opt = {
        margin: 10,
        filename: 'individual_report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
      };

      html2pdf().from(input).set(opt).save();
    }
  };

  useEffect(async () => {
    try {
      const {
        reviewee,
      } = await fetchTsIndividualReport(appReports.individualReportUser.id);

      setReviewee(reviewee)
      setReports(data)
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
          < Profile user={reviewee} />

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
          < FeedbackScores reports={data} />
        </div>
      </div>
      {/* PDF Download Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </>
  );
}

export default IndividualReport;
