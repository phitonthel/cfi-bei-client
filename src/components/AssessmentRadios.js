import React, { useState } from 'react';
import { renderScore } from './AssessmentCard';

export const AssessmentRadios = (assessment, handlers, type) => {
  const assignedScore = assessment.assignedScore

  const generateClass = (score) => score == assignedScore
    ? 'btn btn-outline-dark btn-block btn-sm active'
    : 'btn btn-outline-dark btn-block btn-sm'

  return (
    <>
      <div className='col my-2'>
        <div className='row d-flex justify-content-center'>
          <div className="col-3 m-1">
            <button className={generateClass(0)} onClick={() => handlers.button(assessment.id, 0)}>
              {renderScore(0, type)}
            </button>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className="col-3 m-1">
            <button className={generateClass(1)} onClick={() => handlers.button(assessment.id, 1)}>
              {renderScore(1, type)}
            </button>
          </div>
          <div className="col-3 m-1">
            <button className={generateClass(2)} onClick={() => handlers.button(assessment.id, 2)}>
              {renderScore(2, type)}
            </button>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className="col-3 m-1">
            <button className={generateClass(3)} onClick={() => handlers.button(assessment.id, 3)}>
              {renderScore(3, type)}
            </button>
          </div>
          <div className="col-3 m-1">
            <button className={generateClass(4)} onClick={() => handlers.button(assessment.id, 4)}>
              {renderScore(4, type)}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}