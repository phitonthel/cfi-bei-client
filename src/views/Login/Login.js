import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { fireSwalError } from '../../apis/fireSwal';
import { login, persistAuth } from '../../apis/user/auth';
import { SubmitButton } from '../../components/SubmitButton';
import { setAuth } from "../../redux/authSlice";

import MfaOtpModal from "./MfaOtpModal"
import ForgotPasswordModal from "./ForgotPasswordModal"

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // MFA state
  const [showOtp, setShowOtp] = useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await login({ nik, password });

      // If BE returns MFA challenge
      if (res?.mfaRequired) {
        setChallengeId(res.challengeId);
        setDelivery(res.delivery);
        setExpiresAt(res.expiresAt);
        setShowOtp(true);
        return; // stop here; wait for OTP verify
      }

      // Normal login (no MFA)
      dispatch(setAuth(res));
      persistAuth(res);
      Swal.fire({
        position: 'top',
        icon: 'success',
        text: `Welcome, ${res.fullname}`,
        showConfirmButton: false,
        timer: 1000
      });
      history.push('/hr/cfi/assessment/selections');
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => setShowForgotPasswordModal(true);
  const handleCloseForgotPasswordModal = () => setShowForgotPasswordModal(false);

  // MFA success -> store auth + redirect
  const handleOtpVerified = (authPayload) => {
    dispatch(setAuth(authPayload));
    persistAuth(authPayload);
    Swal.fire({
      position: 'top',
      icon: 'success',
      text: `Welcome, ${authPayload.fullname}`,
      showConfirmButton: false,
      timer: 1000
    });
    setShowOtp(false);
    history.push('/hr/cfi/assessment/selections');
  };

  return (
    <>
      <section className="">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
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
                          type="text"
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

                      <div className="text-end mb-4">
                        <span className="text-danger" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleForgotPassword}>
                          Forgot Password?
                        </span>
                      </div>

                      <SubmitButton
                        text={'Sign In'}
                        onClick={handleChange}
                        isSubmitting={isSubmitting}
                      />

                      {/* Forgot Password Modal */}
                      <ForgotPasswordModal
                        show={showForgotPasswordModal}
                        onHide={handleCloseForgotPasswordModal}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MFA OTP Modal */}
      <MfaOtpModal
        show={showOtp}
        onHide={() => setShowOtp(false)}
        challengeId={challengeId}
        delivery={delivery}
        expiresAt={expiresAt}
        onVerified={handleOtpVerified}
      />
    </>
  );
}

export default Login;
