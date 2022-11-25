import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DivisionReport from './Division'

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])

  useEffect(() => {
  }, [])

  return (
    <>
      <div className='row justify-content-center'>
        <select className="form-select form-select-sm col-2 mx-2">
          <option className="btn" disabled>Select report</option>
          <option className="btn" value="1">One</option>
          <option className="btn" value="2">Two</option>
          <option className="btn" value="3">Three</option>
        </select>
        <button type="button" className="btn btn-primary btn-sm mx-2">Get Report</button>
      </div>

      <DivisionReport />
    </>
  );
};

export default SelfAssessment