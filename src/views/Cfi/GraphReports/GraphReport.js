import React, { useState, useEffect, useRef } from 'react';

import { fetchCfiSummaryReport } from '../../../apis/report/fetchCfiSummaryReport';
import { fireSwalError } from '../../../apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { CustomBarChart } from './BarChart';
import TeamProfile from '../../../components/Reports/TeamProfile';
import UserProfile from 'components/Reports/UserProfile';

const GraphReport = () => {
  const reportRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState([])
  const [topFiveTech, setTopFiveTech] = useState([])
  const [bottomFiveTech, setBottomFiveTech] = useState([])
  const [topFiveBeha, setTopFiveBeha] = useState([])
  const [bottomFiveBeha, setBottomFiveBeha] = useState([])

  useEffect(async () => {
    try {
      const {
        user,
        topFiveTech,
        bottomFiveTech,
        topFiveBeha,
        bottomFiveBeha,
      } = await fetchCfiSummaryReport()

      setUser(user)
      setTopFiveTech(topFiveTech)
      setBottomFiveTech(bottomFiveTech)
      setTopFiveBeha(topFiveBeha)
      setBottomFiveBeha(bottomFiveBeha)
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
          <TeamProfile user={user} />
          {/* <UserProfile user={user} /> */}

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>What is this report?</h4>
              <div>
                This report outlines the top 5 strengths and areas to develop in your team, based on skills and behaviors that at least 75% of team members have in common. Less common skills aren't shown to keep the focus on what most of the team is working with.
              </div>
            </div>
          </div>


          <hr></hr>
          <div className="row mb-4 p-4">

            <div className="col-md-12">
              <h4>Top 5 Technical</h4>
              < CustomBarChart reports={topFiveTech} colors={['#4F6F52', '#739072']} />
            </div>
          </div>

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Top 5 Behavioural</h4>
              < CustomBarChart reports={topFiveBeha} colors={['#4F6F52', '#739072']} />
            </div>
          </div>

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Bottom 5 Technical</h4>
              < CustomBarChart reports={bottomFiveTech} colors={['#940000', '#c30101']} />
            </div>
          </div>

          <hr></hr>
          <div className="row mb-4 p-4">
            <div className="col-md-12">
              <h4>Bottom 5 Behavioural</h4>
              < CustomBarChart reports={bottomFiveBeha} colors={['#940000', '#c30101']} />
            </div>
          </div>

        </div>
      </div>
      {/* PDF Download Button */}
      <div className="text-center mt-4">
      </div>
    </>
  );
};

export default GraphReport;


