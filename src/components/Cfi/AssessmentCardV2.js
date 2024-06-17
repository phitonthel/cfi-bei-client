import React, { useState, useEffect } from 'react';
import { AssessmentRadios } from './AssessmentRadiosV2';
import { Criteria } from './Criteria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const renderScore = (score, type) => {
  if (type === 'TECHNICAL') {
    if (score === 1) return 'KNOWLEDGEABLE'
    if (score === 2) return 'PRACTITIONER'
    if (score === 3) return 'ADVANCED'
    if (score === 4) return 'EXPERT'
  }
  if (type === 'BEHAVIOURAL') {
    if (score === 1) return 'BASIC'
    if (score === 2) return 'CAPABLE'
    if (score === 3) return 'INFLUENCING'
    if (score === 4) return 'INSPIRING'
  }
  return 'N/A'
}

export const AssessmentCard = ({ assessment, handlers, type, isSelfReview }) => {
  const [shouldShowCriterias, setShouldShowCriterias] = useState(false)

  const descriptionClassName = isSelfReview ? "col-9 text-left" : "col-6 text-left"
  console.log('AMELIA', isSelfReview)

  return (
    <div className="card mx-6">
      <div className="card-header text-left mx-2">
        <h3>{assessment.competencyRole.Competency.category}</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className={descriptionClassName}>
            <h4 className="card-title mx-4">{assessment.competencyRole.Competency.title}</h4>
            <p className="card-text mx-4">{assessment.competencyRole.Competency.description}</p>
            <div className="mx-4">
              <a
                className="link"
                style={{ cursor: 'pointer' }}
                // onClick={() => handlers.expand(assessment.id)}
                onClick={() => setShouldShowCriterias(!shouldShowCriterias)}
              >
                Penjelasan detail masing-masing level{' '}
                <FontAwesomeIcon
                  icon={shouldShowCriterias ? faChevronUp : faChevronDown}
                />
              </a>
              {shouldShowCriterias && (
                <div className="mt-4">
                  <div className="row">
                    <div className="col">
                      <Criteria options={assessment.competencyRole.Competency.options} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-3">
            <AssessmentRadios
              assessment={assessment}
              handlers={handlers}
              type={type}
              isSelfReview={isSelfReview}
              assessmentRadioType={`SELF`}
            />
          </div>
          {
            !isSelfReview && (
              <div className="col-3">
                <AssessmentRadios
                  assessment={assessment}
                  handlers={handlers}
                  type={type}
                  isSelfReview={isSelfReview}
                  assessmentRadioType={`REVIEWER`}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}