import React, { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { CustomBarChart } from './BarChart';
import { fireSwalError } from '../../../apis/fireSwal';
import { fetchCfiSummaryReport } from '../../../apis/report/fetchCfiSummaryReport';
import { DownloadPdfButton } from '../../../components/Buttons/DownloadButtons';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import PageBreakPrint from '../../../components/Reports/PageBreakPrint';
import TeamProfile from '../../../components/Reports/TeamProfile';

const GraphReport = () => {
  const appReports = useSelector(state => state.app.reports);
  const appUtilities = useSelector(state => state.app.utilities);

  const reportRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])
  const [topTechnicals, setTopTechnicals] = useState([])
  const [bottomTechnicals, setBottomTechnicals] = useState([])
  const [topBehaviourals, setTopBehaviourals] = useState([])
  const [bottomBehaviourals, setBottomBehaviourals] = useState([])

  useEffect(async () => {
    try {
      const {
        user,
        users,
        topTechnicals,
        bottomTechnicals,
        topBehaviourals,
        bottomBehaviourals,
        // } = await fetchCfiSummaryReport({ query: `userId=${appReports.selectedUserReport.id}` })
      } = await fetchCfiSummaryReport({
        userId: appReports.selectedUserReport.id,
        cfiTypeAssessmentId: appUtilities.cfiTypeAssessment.id,
      })

      setUser(user)
      setUsers(users)
      setTopTechnicals(topTechnicals)
      setBottomTechnicals(bottomTechnicals)
      setTopBehaviourals(topBehaviourals)
      setBottomBehaviourals(bottomBehaviourals)
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
            <h2>Competency Fit Index Graph Report</h2>
          </div>

          <hr></hr>
          <TeamProfile user={user} nUsers={users.length} />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>What is this report?</h4>
              <div>
                {/* This report outlines the top 5 strengths and areas to develop in your team, based on competencies that are at least 75% of team members have in common. 
                Less common competencies aren't shown to keep the focus on what is most needed in your team. */}
                {/* This report outlines the strength and weaknesses to develop in your team based on technical and behavioral competencies. The competencies that are shown in the report are the major competencies that the team has in common, with at least 75% of team members are required to have the competencies. */}

                This report presents an analysis of the strengths and areas for improvement within your team, focusing on both technical and behavioral competencies. It identifies key competencies shared by the team, highlighting those possessed by at least 75% of team members. This report is designed to help you understand the collective strengths and areas for development within your team, and to support you in making informed decisions about training and development opportunities.
              </div>
            </div>
          </div>
          <PageBreakPrint />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Meet Requirements Behavioral</h4>
              < CustomBarChart reports={topBehaviourals} colors={['#4F6F52', '#739072']} />
            </div>
          </div>
          <PageBreakPrint />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Need Development Behavioural</h4>
              < CustomBarChart reports={bottomBehaviourals} colors={['#940000', '#c30101']} />
            </div>
          </div>
          <PageBreakPrint />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Meet Requirements Technical</h4>
              < CustomBarChart reports={topTechnicals} colors={['#4F6F52', '#739072']} />
            </div>
          </div>
          <PageBreakPrint />

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Need Development Technical</h4>
              < CustomBarChart reports={bottomTechnicals} colors={['#940000', '#c30101']} />
            </div>
          </div>

        </div>
      </div>
      {/* PDF Download Button */}
      <DownloadPdfButton
        reportRef={reportRef}
        filename={`cfi_graph_report_${user.division.toLowerCase().replaceAll(' ', '_')}` + `_${(user.unit ?? '-').toLowerCase().replaceAll(' ', '_')}`}
      />
    </>
  );
};

export default GraphReport;


