import React from 'react';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { renderScore } from './AssessmentCardV2';

const StyledButton = styled.button`
  &.btn {
    border: 1px solid #343a40; /* Match the outline-dark border */
    background-color: transparent;
    color: #343a40; /* Match the outline-dark text color */
  }
  &.btn-block {
    display: block;
    width: 100%;
  }
  &.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }
  &.active {
    background-color: #343a40; /* Dark background for active state */
    color: white;
  }
  &.active:disabled {
    background-color: #721c24; /* Dark red background for selected and disabled */
    color: white;
    cursor: not-allowed; /* Change the cursor to indicate it's disabled */
    border: 1px solid #721c24; /* Border to match the background color */
  }
  &:disabled:not(.active) {
    background-color: #f8d7da; /* Light red background for not-selected and disabled */
    color: #721c24; /* Dark red text color for better contrast */
    cursor: not-allowed; /* Change the cursor to indicate it's disabled */
    border: 1px solid #f5c6cb; /* Border to match the background color */
  }
`;

const getScoreText = (assessmentRadioType) => {
  if (assessmentRadioType === 'SELF') return 'Self Score:'
  return 'Reviewer Score:'
}


export const AssessmentRadios = ({
  assessment,
  handlers,
  type,
  isDisabled,
  assessmentRadioType, // ENUM: SELF OR REVIEWER
}) => {
  const authUser = useSelector(state => state.auth.user);

  const score = assessmentRadioType === 'REVIEWER'
    ? assessment.reviewerAssessment.score
    : assessment.revieweeAssessment.score

  const justificationValue = assessmentRadioType === 'REVIEWER'
    ? assessment.reviewerAssessment.justification
    : assessment.revieweeAssessment.justification

  const generateClass = (num) => num == score
    ? 'btn btn-outline-dark btn-block btn-sm active'
    : 'btn btn-outline-dark btn-block btn-sm'

  const renderTooltip = (text) => (
    <Tooltip>
      {text}
    </Tooltip>
  );

  return (
    <div className='col my-2'>
      <div className='row d-flex justify-content-center'>
        <div className="col-12 text-left">
          <span>{getScoreText(assessmentRadioType)}</span>
          {/* <OverlayTrigger
            placement="top"
            overlay={renderTooltip('This is the score you assign to this assessment')}>
            <FontAwesomeIcon icon={faInfoCircle} className="ml-2" style={{ cursor: 'pointer' }} />
          </OverlayTrigger> */}
        </div>
      </div>
      {Array.from({ length: 5 }, (_, index) => (
        <div className='row d-flex justify-content-center my-2' key={index}>
          <div className="col-12 m-1">
            <StyledButton
              className={generateClass(index)}
              onClick={() => handlers.button(assessment.id, index)}
              disabled={isDisabled}
            >
              {renderScore(index, type)}
            </StyledButton>
          </div>
        </div>
      ))}
      <div className='row d-flex justify-content-center mt-3'>
        <div className="col-12 text-left">
          <span>Justification:</span>
          {/* <OverlayTrigger
            placement="top"
            overlay={renderTooltip('Provide a justification for the selected score')}>
            <FontAwesomeIcon icon={faInfoCircle} className="ml-2" style={{ cursor: 'pointer' }} />
          </OverlayTrigger> */}
          <textarea
            value={justificationValue}
            className="form-control mt-1"
            placeholder="(Optional) Describe the factors that led to this score"
            rows="4"
            onChange={(e) => handlers.justification(assessment.id, e.target.value)}
            // onChange={(e) => { }}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  )
}
