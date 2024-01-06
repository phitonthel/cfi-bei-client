import OpenFeedback from "./OpenFeedback";

const OpenFeedbacks = ({
  essayReports,
}) => {
  const supervisorFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SUPERVISOR');
  const peerFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'PEER');
  const selfFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SELF');
  const subordinateFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SUBORDINATE');

  return (
    <>
      <OpenFeedback essayReports={supervisorFeedbacks} title={`Feedback from Supervisors`}/>
      <hr></hr>

      <OpenFeedback essayReports={peerFeedbacks} title={`Feedback from Peers`}/>
      <hr></hr>

      <OpenFeedback essayReports={selfFeedbacks} title={`Feedback from Self`}/>
      <hr></hr>

      <OpenFeedback essayReports={subordinateFeedbacks} title={`Feedback from Subordinates`}/>
    </>
  )
}

export default OpenFeedbacks;
