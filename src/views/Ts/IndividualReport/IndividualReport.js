import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import CardBreakdown from './components/CardBreakdown'
import { fetchTsIndividualReport } from '../../../apis/report/fetchTsIndividualReport';
import OpenFeedback from './components/OpenFeedback';
import Graph from './components/Graph';
import { fireSwalError } from 'apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Profile from './components/Profile';
import FeedbackScores from './components/FeedbackScores';

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
        reports,
        essayReports,
      } = await fetchTsIndividualReport(appReports.individualReportUser.id);
  
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
          < Profile user={reviewee}/>

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
          <Graph reports={reports}/>

          <hr></hr>
          <div className="mb-4 p-4">
            <h2>Feedback Scores</h2>
            <div>
              < FeedbackScores reports={reports}/>
              {/* {
                reports.map(report =>
                  < CardBreakdown
                    title={report.title}
                    subAvgScore={report.subAvgScore}
                    peerAvgScore={report.peerAvgScore}
                    supAvgScore={report.supAvgScore}
                    selfAvgScore={report.selfAvgScore}
                    totalAvgScore={report.totalAvgScore}
                  />)
              } */}
            </div>
          </div>

          <hr></hr>
          <OpenFeedback essayReports={essayReports}/>
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
