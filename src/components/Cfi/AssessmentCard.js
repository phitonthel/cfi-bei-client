import React, { useState } from 'react';

import { AssessmentRadios } from './AssessmentRadios'
import { Criteria } from './Criteria'

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

export const AssessmentCard = (assessment, handlers, type) => {
  return (
    <div>
      <div className="card text-center mx-6">
        <div className="card-header">
          <h3>{assessment.category}</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title">{assessment.title}</h4>
          <p className="card-text mx-4">{assessment.description}</p>

          {AssessmentRadios(assessment, handlers, type)}

        </div>

        <div className="card-footer text-muted">
          {!assessment.shouldShowCriterias &&
            <a className="link" style={{ cursor: 'pointer' }} onClick={() => handlers.expand(assessment.id)}>Penjelasan detail masing-masing level</a>
          }
          {assessment.shouldShowCriterias &&
            <>
              <div className="row">
                <div className="col">
                  <a className="link" style={{ cursor: 'pointer' }} onClick={() => handlers.expand(assessment.id)}>Penjelasan detail masing-masing level</a>
                </div>
                <div className="col">
                  {
                    Criteria(assessment, handlers)
                  }
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}