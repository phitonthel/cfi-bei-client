import OpenFeedback from "./OpenFeedback";
import PageBreakPrint from "../../../../components/Reports/PageBreakPrint";
import Justifications from "./Justifications";
import { useSelector } from "react-redux";

const shuffle = (array) => {
  const arr = [...array]; // clone so original is untouched
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const OpenFeedbacks = ({
  essayReports,
}) => {
  const authUser = useSelector(state => state.auth.user);

  const supervisorFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SUPERVISOR');
  const peerFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'PEER');
  const selfFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SELF');
  const subordinateFeedbacks = essayReports.filter(report => report.reviewerLevelType === 'SUBORDINATE');

  return (
    <>
      <h2>Feedback Reflection</h2>

      <OpenFeedback
        essayReports={shuffle(essayReports)}
        title={``}
      />
      <hr></hr>
      <PageBreakPrint />
    </>
  )
}

export default OpenFeedbacks;
