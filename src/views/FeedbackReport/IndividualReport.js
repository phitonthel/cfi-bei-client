import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CardBreakdown from './components/CardBreakdown'
import { fetchSelfDetail } from '../../apis/user/fetchSelfDetail';
import { fetchSelfAssessment } from 'apis/assessment/fetchSelf';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

// Dummy data for the graph
const data = [
  { category: 'Leadership', score: 4.5 },
  { category: 'Communication', score: 4.0 },
  { category: 'Teamwork', score: 3.8 },
  { category: 'Problem Solving', score: 4.2 },
  { category: 'Adaptability', score: 3.9 },
  { category: 'Leadership', score: 4.5 },
  { category: 'Communication', score: 4.0 },
  { category: 'Teamwork', score: 3.8 },
  { category: 'Problem Solving', score: 4.2 },
  { category: 'Adaptability', score: 3.9 },
];

function IndividualReport() {
  const reportRef = useRef(null);

  const [user, setUser] = useState({})
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const data = await fetchSelfDetail()
      setUser({
        nik: data?.nik,
        division: data?.Division?.name,
        role: data?.positionName,
        email: data?.email,
        name: data?.fullname
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchSelfAssessmentData();
  }, []);

  const fetchSelfAssessmentData = async () => {
    try {
      const response = await fetchSelfAssessment();
      console.log(response)
      
      if (!response || !response.data) {
        console.error("Invalid response from fetchSelfAssessment:", response);
        fireSwalError(error)
      }
  
      const { data } = response;
      
      if (data.message) {
        fireSwalError(error)
      }
  
      setData(data.map(assessment => ({
        revieweeId: assessment.revieweeId,
        reviewerId: assessment.reviewerId,
        score: assessment.score,
        description: assessment.TsCompetencies.description,
        title: assessment.TsCompetencies.title,
      })));
    } catch (error) {
      console.error(error);
      fireSwalError(error)
    } finally {
      setIsLoading(false);
    }
  };

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


  return (
    <>
      <div className="container mt-4" ref={reportRef}>
        <div className="container mt-4">
          <div class="text-center mb-4">
            <h1>360 Degree Feedback Report</h1>
            <p class="lead">Feedback for: {user.name}</p>
          </div>

          <hr></hr>
          {/* Profile Section */}
          <div className="row mb-4 p-4">
            <div className="col-md-8">
              <h2 >Profile</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>NIK</td>
                    <td>{user.nik}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          {/* Table containing the Scores */}
          <div className="row mb-4 p-4">
            <div className="col-md-8">
              <h2>Feedback Scores - Summary</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Building Trust</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Customer Focus</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>Facilitating Change</td>
                    <td>3.8</td>
                  </tr>
                  {/* Add more rows for other categories */}
                </tbody>
              </table>
            </div>
          </div>

          <hr></hr>
          <div className="row mb-4 p-4">
            <h2>Feedback Scores - Detailed</h2>
            {data.map((assessment, index) => (
              <CardBreakdown key={index} categoryName={assessment.title} data={assessment} />
            ))}
          </div>

          <hr></hr>
          {/* Graphs containing the Scores */}
          <div className="row mb-4 p-4">
            <div className="col-md-6">
              <h2>Feedback Scores - Graphs</h2>
              <div style={{ height: '400px' }}>
                <BarChart width={900} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="navy" />
                </BarChart>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* Feedback from Peers */}
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h2>Feedback from Peers</h2>
              <h3>Strengths:</h3>
              <p className="card p-2" style={{ "background-color": "#e6f9e6" }}>
                Ni is an excellent communicator and has strong leadership skills.
              </p>
              <p className="card p-2" style={{ "background-color": "#e6f9e6" }}>
                Ni is ...
              </p>
              <h3>Weaknesses:</h3>
              <p className="card p-2" style={{ "background-color": "#ffdddc" }}>
                Ni sometimes struggles with time management and could improve her
                delegation skills.
              </p>
              <p className="card p-2" style={{ "background-color": "#ffdddc" }}>
                Ni sometimes struggles with ...
              </p>
              <h3>Room for Improvement:</h3>
              <p className="card p-2" style={{ "background-color": "#ffffe0" }}>
                Ni should focus on improving her ability to handle conflict and
                provide constructive feedback to team members.
              </p>
              <p className="card p-2" style={{ "background-color": "#ffffe0" }}>
                Ni should focus on ...
              </p>
            </div>
          </div>
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
