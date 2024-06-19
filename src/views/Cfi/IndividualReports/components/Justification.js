import React from 'react';

import ReportCard from './ReportCard';
import PageBreakPrint from '../../../../components/Reports/PageBreakPrint';

const Justification = ({
  reportJustifications,
  isForPrint
 }) => {
  const HACKY_MARGIN_FOR_NOT_BEING_CUT = 9
  
  return (
    <div className="row p-4">
      <div className="col-md-12">
        <h3>CFI Justification</h3>

        {
          reportJustifications.map((justification, index) => (
            <>
              {
                (index > 0 && index % 3 === 0 && isForPrint) && (
                  <>
                    <PageBreakPrint />
                    <div style={{ marginBottom: index * HACKY_MARGIN_FOR_NOT_BEING_CUT }} />
                  </>
                )
              }
              <ReportCard
                key={index}
                title={justification.title}
                type={justification.type}
                isPassed={justification.isPassed}
                selfScore={justification.selfScore}
                selfJustification={justification.selfJustification}
                reviewerFeedback={justification.reviewerJustifications}
              />
            </>
          ))
        }
      </div>
    </div>
  );
}

export default Justification;
