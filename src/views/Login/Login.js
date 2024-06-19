import React, { useState } from 'react';

import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";

import { fireSwalError } from '../../apis/fireSwal';
import { login } from '../../apis/user/auth';
import { SubmitButton } from '../../components/SubmitButton';
import { setAuth } from "../../redux/authSlice";

function Login() {
  const history = useHistory()
  const dispatch = useDispatch();

  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      const auth = await login({ nik, password })
      dispatch(setAuth(auth));
      history.push('/admin/cfi/assessment/selections')
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <section className="">
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

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="form3Example4"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={togglePasswordVisibility}
                              style={{ cursor: 'pointer' }}
                            >
                              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Forgot Password Text */}
                      <div className="text-end mb-4">
                        <span className="text-danger" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleForgotPassword}>
                          Forgot Password?
                        </span>
                      </div>

                      <SubmitButton
                        text={'Sign In'}
                        onClick={event => handleChange(event)}
                        isSubmitting={isSubmitting}
                      />

                      {/* Forgot Password Modal */}
                      <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Forgot Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          If you have never changed your password before, please use
                          this <a href="https://bit.ly/ReqPassword-CFI" target="_blank" rel="noreferrer">link</a> to request a new password.<br></br>
                          If you have already changed the password, please contact the
                          Person In Charge at SDM (Amalia Maulida/ Carinna Andiva) for
                          assistance with the password.
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
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

export default Login;
