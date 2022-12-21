import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DivisionReport from './Division/index'
import DivisionSingleReport from './DivisionSingle/index'

function SelfAssessment() {
  const [option, setOption] = useState(0)
  const [division, setDivision] = useState(0)

  useEffect(() => {
  }, [])

  return (
    <>
      <div className='row justify-content-center mb-4'>
        <select className="form-select form-select-sm col-2 mx-2" value={option} onChange={(e) => {
          setOption(+e.target.value)
        }}>
          <option className="btn" >Select Report</option>
          <option className="btn" value="1">Rekap Seluruh Divisi</option>
          <option className="btn" value="2">Rekap Per Divisi</option>
          <option className="btn" value="3">Rekap Per Individu</option>
        </select>
        {/* { option === 2 &&
          <select className="form-select form-select-sm col-2 mx-2" value={division} defaultValue>
            <option className="btn" disabled>Select Division</option>
            <option className="btn" value="1" onClick={() => setDivision(1)}>Sumber Daya Manusia</option>
            <option className="btn" value="2" onClick={() => setDivision(2)}>Pengawasan Transaksi</option>
          </select>
        } */}
        <button type="button" className="btn btn-dark btn-fill btn-sm mx-2">Get Report</button>
      </div>

      { option === 1 && <DivisionReport /> }
      {/* { option === 2 && <DivisionSingleReport /> } */}
    </>
  );
};

export default SelfAssessment