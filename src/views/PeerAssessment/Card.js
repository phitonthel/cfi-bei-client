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
        <div className='d-flex justify-content-between m-1'>
          <h4 className='p-0 m-0'>
            <span className="badge badge-dark">{'Expected Score: ' + renderScore(assessment.expectedScore)}</span>
          </h4>
          <h4 className='p-0 m-0'>
          <span className="badge badge-dark">{'Score by Assigned: ' + renderScore(assessment.assignedScore)}</span>
          </h4>
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
          {!assessment.shouldShowCriterias &&
            <a href="#" className="link-primary" onClick={() => handlers.expand(assessment.id)}>Show criterias for each level</a>
          }
          {assessment.shouldShowCriterias &&
            <>
              <div className="row">
                <div className="col">
                  <a href="#" className="link-primary" onClick={() => handlers.expand(assessment.id)}>Hide criterias for each level</a>
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