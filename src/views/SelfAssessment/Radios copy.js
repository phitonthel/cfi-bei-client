import React, { useState } from 'react';

export const Radios = (assessmentId, handleRadio) => {
  console.log('Radios:', { assessmentId })
  // const [buttonOne, setButtonOne] = useState(1)

  return (
    <>
      <div className='col my-2'>
        {/* { buttonOne } */}
        <div className='row d-flex justify-content-center'>
          <div className="col-3">
            <button className="btn btn-outline-primary btn-block btn-sm">KNOWLEDGEABLE</button>
          </div>
          <div className="col-3">
            <button className="btn btn-outline-primary btn-block btn-sm">PRACTITIONER</button>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className="col-3">
            <button className="btn btn-outline-primary btn-block btn-sm">EXPERT</button>
          </div>
          <div className="col-3">
            <button className="btn btn-outline-primary btn-block btn-sm">ADVANCED</button>
          </div>
        </div>
      </div>
      
      {/* <div className='col my-2' onChange={(e) => handleRadio(e, assessmentId)}>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="radio1" name={assessmentId} value={1} />
          <label className="form-check-label" htmlFor="radio1">KNOWLEDGEABLE</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="radio2" name={assessmentId} value={2} />
          <label className="form-check-label" htmlFor="radio2">PRACTITIONER</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="radio3" name={assessmentId} value={3} />
          <label className="form-check-label" htmlFor="radio3">EXPERT</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="radio4" name={assessmentId} value={4} />
          <label className="form-check-label" htmlFor="radio4">ADVANCED</label>
        </div>
      </div> */}
    </>
  )
}