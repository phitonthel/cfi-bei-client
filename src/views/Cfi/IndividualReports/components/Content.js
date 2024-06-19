
import PageBreakPrint from '../../../../components/Reports/PageBreakPrint';
import Profile from '../../../../components/Reports/UserProfile';
import CompetencyInfoLegend from '../components/CompetencyInfoLegend';
import FeedbackScores from '../components/FeedbackScores';
import Justification from '../components/Justification';

const Content = ({
  reviewee,
  reports,
  reportsSummary,
  reportJustifications,
  isForPrint,
}) => {
  return (
    <>
      <div className="container mt-4">
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
              <h3>What is Competency Fit Index?</h3>
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
          <PageBreakPrint />

          <hr></hr>
          <Justification 
            reportJustifications={reportJustifications}
            isForPrint={isForPrint}
          />

        </div>
      </div>
    </>
  )
}

export default Content;