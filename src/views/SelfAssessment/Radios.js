import React, { useState } from 'react';

export const Radios = (assessment, handlers) => {
  const assignedScore = assessment.assignedScore

  // console.log({assignedScore})

  const generateClass = (score) => score == assignedScore 
    ? 'btn btn-outline-primary btn-block btn-sm active' 
    : 'btn btn-outline-primary btn-block btn-sm'

  return (
    <>
      <div className='col my-2'>
        <div className='row d-flex justify-content-center'>
          <div className="col-3 m-1">
            <button className={generateClass(1)} onClick={() => handlers.button(assessment.id, 1)} >KNOWLEDGEABLE</button>
          </div>
          <div className="col-3 m-1">
            <button className={generateClass(2)} onClick={() => handlers.button(assessment.id, 2)}>PRACTITIONER</button>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className="col-3 m-1">
            <button className={generateClass(3)} onClick={() => handlers.button(assessment.id, 3)}>ADVANCED</button>
          </div>
          <div className="col-3 m-1">
            <button className={generateClass(4)} onClick={() => handlers.button(assessment.id, 4)}>EXPERT</button>
          </div>
        </div>
      </div>
    </>
  )
}