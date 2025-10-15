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

const StyledTextarea = styled.textarea`
  background-color: white;
  color: black;
  opacity: 1;
  // cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
  // pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  resize: none;

  &:disabled {
    // background-color: #e8e8e8;
    background-color: white;
    color: black;
  }
`;

const getScoreText = (assessmentRadioType) => {
  if (assessmentRadioType === 'SELF') return 'Self Score:'
  return 'Reviewer Score:'
}

const ASSESSMEMNT_RADIO_TYPE = {
  SELF: 'SELF',
  REVIEWER: 'REVIEWER',
}

export const AssessmentRadios = ({
  assessment,
  handlers,
  type,
  isDisabled,
  assessmentRadioType, // ENUM: SELF OR REVIEWER
}) => {
  const authUser = useSelector(state => state.auth.user);

  const score = assessmentRadioType === ASSESSMEMNT_RADIO_TYPE.REVIEWER
    ? assessment.reviewerAssessment.score
    : assessment.revieweeAssessment.score

  const justificationValue = assessmentRadioType === ASSESSMEMNT_RADIO_TYPE.REVIEWER
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
          {getScoreText(assessmentRadioType) === 'Self Score:' && (
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip('The ratee has set this as their own score/justification')}>
              <FontAwesomeIcon icon={faInfoCircle} className="ml-2" style={{ cursor: 'pointer' }} />
            </OverlayTrigger>
          )}
        </div>
      </div>
      {Array.from({ length: 5 }, (_, index) => (
        <div className='row d-flex justify-content-center my-2' key={index}>
          <div className="col-12 m-1">
            <StyledButton
              className={generateClass(index)}
              onClick={() => handlers.button(assessment.id, index)}
              disabled={isDisabled}
              style={{ fontSize: '12px' }}
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
          <StyledTextarea
            value={justificationValue}
            className="form-control mt-1"
            placeholder="(Required) Describe the factors that led to this score"
            rows="4"
            onChange={(e) => handlers.justification(assessment.id, e.target.value)}
            disabled={isDisabled}
          />
          {/* set error text */}
          {assessment.errorMessage && assessmentRadioType === ASSESSMEMNT_RADIO_TYPE.REVIEWER && (
            <div className="text-danger mt-1">
              {assessment.errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
