import React, { useState } from 'react';

import { Radios } from './Radios'
import { Criteria } from './Criteria'

export const Card = (assessment, handlers) => {
  const renderScore = (score) => {
    if (score === 1) return 'KNOWLEDGEABLE'
    if (score === 2) return 'PRACTITIONER'
    if (score === 3) return 'ADVANCED'
    if (score === 4) return 'EXPERT'
    return 'N/A'
  }

  return (
    <div>
      <div className="card text-center mx-6">
        <div className='d-flex flex-row-reverse m-1'>
          <span class="badge badge-dark">{'Score by Reviewer: ' + renderScore(assessment.reviewerScore)}</span>
        </div>
        <div className="card-header">
          <h3>{assessment.category}</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title">{assessment.title}</h4>
          <p className="card-text">{assessment.description}</p>

          {Radios(assessment, handlers)}

        </div>

        <div className="card-footer text-muted">
          {/* 2 days ago */}
          {!assessment.shouldShowCriterias &&
            <a href="#" className="link-primary" onClick={() => handlers.expand(assessment.id)}>Expand</a>
          }
          {assessment.shouldShowCriterias &&
            <>
              <div className="row">
                <div className="col">
                  <a href="#" className="link-primary" onClick={() => handlers.expand(assessment.id)}>Collapse</a>
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