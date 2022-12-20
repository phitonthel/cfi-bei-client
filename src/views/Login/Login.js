import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import DataTable from 'react-data-table-component';
import { login } from '../../apis/user/auth';

function Login() {
  const history = useHistory()

  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = async (event) => {
    event.preventDefault()

    await login({nik, password})
    history.push('/')
  }

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section className="">
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ "backgroundColor": "hsl(0, 0%, 96%)" }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">

              <div className="col-lg-3 mb-5 mb-lg-0">
                {/* <h1 className="my-5 display-5 fw-bold ls-tight">
                  Competency Fit Index <br />
                  <span className="text-primary">Bursa Efek Indonesia</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p> */}
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                      {/* <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1" className="form-control" />
                            <label className="form-label" for="form3Example1">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example2" className="form-control" />
                            <label className="form-label" for="form3Example2">Last name</label>
                          </div>
                        </div>
                      </div> */}

                      <div className="form-outline mb-4">
                        <h2 className="text-tiny">
                          <span className="">Welcome!</span>
                        </h2>
                      </div>

                      {/* <!-- Email input --> */}
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

                      {/* <!-- Checkbox --> */}
                      {/* <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                      </div> */}

                      {/* <!-- Submit button --> */}
                      <button
                        type=""
                        className="btn btn-primary btn-block mb-4"
                        onClick={event => handleChange(event)}
                      >
                        Sign In
                      </button>

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