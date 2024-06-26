import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import DivisionReport from './Division/index'
import DivisionSingleReport from './DivisionSingle/index'
import UserReport from './User/index'
import { fetchCfiOptionsReport } from '../../apis/report/fetchCfiOptionsReport';

const REPORT_TYPE = {
  DIVISION_SUMMARY: "Division Summary",
  DIVISION_SINGLE: "Division Single",
  INDIVIDUAL: "Individual",
  UNIT: "Unit",
  LEVEL: "Level",
  DIRECTORATE: "Directorate",
  AREA: "Area",
}

function SelfAssessment() {
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState({
    directorates: [],
    divisions: [],
    units: [],
    area: [],
  })

  const [input, setInput] = useState({
    type: '',
    directorateName: '',
    divisionName: '',
    unitName: '',
    areaName: '',
  })

  const [state, setState] = useState({
    type: '',
    directorateName: '',
    divisionName: '',
    unitName: '',
    areaName: '',
  })

  const determineName = () => {
    if (state.type === REPORT_TYPE.DIRECTORATE) {
      return state.directorateName
    }
    if (state.type === REPORT_TYPE.DIVISION_SINGLE) {
      return state.divisionName
    }
    if (state.type === REPORT_TYPE.UNIT) {
      return state.unitName
    }
    return ""
  }

  const initOptions = async () => {
    try {
      const data = await fetchCfiOptionsReport();
      setInput({
        ...input,
        directorateName: data.directorates[0],
        divisionName: data.divisions[0],
        unitName: data.units[0],
      })
      setOptions(data)
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await initOptions()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='row justify-content-center mb-4'>
        <select
          className="form-select form-select-sm col-2 mx-2"
          value={input.type}
          onChange={(e) => {
            setInput({
              ...input,
              type: e.target.value,
            })
          }}
        >
          <option className="btn" >Select Report</option>
          <option className="btn" value={REPORT_TYPE.DIVISION_SUMMARY}>Rekap Seluruh Divisi</option>
          <option className="btn" value={REPORT_TYPE.DIVISION_SINGLE}>Rekap Per Divisi</option>
          <option className="btn" value={REPORT_TYPE.INDIVIDUAL}>Rekap Per Individu</option>
        </select>

        {input.type === REPORT_TYPE.DIVISION_SINGLE &&
          <select
            className="form-select form-select-sm col-2 mx-2"
            value={input.divisionName}
            onChange={(e) => {
              setInput({
                ...input,
                divisionName: e.target.value,
              })
            }}
          >
            <option className="btn" disabled>Select Division</option>
            {options.divisions.map(division => <option className="btn" key={division} value={division}>{division}</option>)}
          </select>
        }

        <button
          type="button"
          className="btn btn-dark btn-fill btn-sm mx-2"
          onClick={() => {
            setState({
              ...state,
              ...input,
            })
          }}
        >
          Get Report
        </button>
      </div>

      {state.type === REPORT_TYPE.DIVISION_SUMMARY && <DivisionReport />}
      {state.type === REPORT_TYPE.DIVISION_SINGLE && <DivisionSingleReport divisionType={state.divisionName} />}
      {state.type === REPORT_TYPE.INDIVIDUAL && <UserReport type={state.type} name={determineName()} />}
    </>
  );
};

export default SelfAssessment