import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DivisionReport from './Division/index'
import DivisionSingleReport from './DivisionSingle/index'
import UserReport from './User/index'

import { useFetch } from '../../apis/useFetch'

function SelfAssessment() {
  const [reportType, setReportType] = useState(0)
  const [divisionType, setDivisionType] = useState('')

  const [renderOption, setRenderOption] = useState({
    reportType: 0,
    divisionType: '',
  })

  const { data: divisions } = useFetch('/division')

  useEffect(() => {
    setDivisionType(divisions?.[0])
  }, [divisions])

  return (
    <>
      <div className='row justify-content-center mb-4'>
        <select
          className="form-select form-select-sm col-2 mx-2"
          value={reportType}
          onChange={(e) => {
            setReportType(+e.target.value)
          }}
        >
          <option className="btn" >Select Report</option>
          <option className="btn" value="1">Rekap Seluruh Divisi</option>
          <option className="btn" value="2">Rekap Per Divisi</option>
          <option className="btn" value="3">Rekap Per Individu</option>
        </select>
        {reportType === 2 &&
          <select
            className="form-select form-select-sm col-2 mx-2"
            value={divisionType}
            onChange={(e) => {
              setDivisionType(e.target.value)
            }}
          >
            <option className="btn" disabled>Select Division</option>
            {divisions.map(division => <option className="btn" key={division} value={division}>{division}</option>)}
          </select>
        }
        <button
          type="button"
          className="btn btn-dark btn-fill btn-sm mx-2"
          onClick={() => {
            setRenderOption({
              reportType,
              divisionType,
            })
          }}
        >
          Get Report
        </button>
      </div>

      {renderOption.reportType === 1 && <DivisionReport />}
      {renderOption.reportType === 2 && <DivisionSingleReport divisionType={renderOption.divisionType} />}
      {renderOption.reportType === 3 && <UserReport />}
    </>
  );
};

export default SelfAssessment