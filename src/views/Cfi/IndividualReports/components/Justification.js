import React from 'react';

import ReportCard from './ReportCard';
import PageBreakPrint from '../../../../components/Reports/PageBreakPrint';

const Justification = ({
  reportJustifications,
  isForPrint
}) => {
  const NUMBER_OF_JUSTIFICATIONS_PER_PAGE = 3;
  const HACKY_MARGIN_FOR_NOT_BEING_CUT = 3

  return (
    <div className="row p-4">
      <div className="col-md-12">
        <h3>CFI Justifications</h3>

        {
          reportJustifications.map((justification, index) => (
            <>
              {
                (index > 0 && index % NUMBER_OF_JUSTIFICATIONS_PER_PAGE === 0 && isForPrint) && (
                  <>
                    <PageBreakPrint />
                    <div style={{ marginBottom: index * HACKY_MARGIN_FOR_NOT_BEING_CUT }} />
                  </>
                )
              }
              <div style={isForPrint ? { height: '400px' } : { height: 'auto' }}>
                <ReportCard
                  key={index}
                  title={justification.title}
                  type={justification.type}
                  isPassed={justification.isPassed}
                  selfScore={justification.selfScore}
                  selfJustification={justification.selfJustification}
                  reviewerFeedback={justification.reviewerJustifications}
                />
              </div>
            </>
          ))
        }
      </div>
    </div>
  );
}

export default Justification;
