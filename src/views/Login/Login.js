import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import DataTable from 'react-data-table-component';
import { login } from '../../apis/user/auth';
import { SubmitButton } from '../../components/SubmitButton';
import { fireSwalError } from '../../apis/fireSwal';

function Login() {
  const history = useHistory()

  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      await login({ nik, password })
      history.push('/admin/self-assessment-behavioural')
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section className="">
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ "backgroundColor": "hsl(0, 0%, 96%)" }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-3 mb-5 mb-lg-0"></div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      <div className="form-outline mb-4">
                        <h2 className="text-tiny">
                          <span className="">Welcome!</span>
                        </h2>
                      </div>

                      {/* <!-- NIK input --> */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">NIK</label>
                        <input
                          type="username"
                          id="form3Example3"
                          className="form-control"
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                        />
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <SubmitButton
                        text={'Sign In'}
                        onClick={event => handleChange(event)}
                        isSubmitting={isSubmitting}
                      />

                      {/* <button
                        type=""
                        className="btn btn-primary btn-block mb-4"
                        onClick={event => handleChange(event)}
                      >
                        Sign In
                      </button> */}

                      {/* <!-- Register buttons --> */}
                      {/* <div className="text-center">
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-google"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-github"></i>
                        </button>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Login