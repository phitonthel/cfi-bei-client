import React, { useState } from 'react';
import {
  Card
} from "react-bootstrap";

import { Radios } from './Radios'

export const AssessmentCard = (idx, assessment, handlers, type) => {
  return (
    <div>
      <div className="card text-center mx-6">

        <div className="card-header">
          <h3>{assessment.category}</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title">{assessment.title}</h4>
          
          <div className="d-flex justify-content-center">
            <p className="card-text mx-4 col-10">{assessment.description}</p>
          </div>

          {Radios(assessment, handlers, type)}

        </div>
      </div>
    </div>
  )
}