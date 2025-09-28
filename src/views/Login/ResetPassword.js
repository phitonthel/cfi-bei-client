import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resetPassword } from '../../apis/user/auth';
import { fireSwalError } from '../../apis/fireSwal';
import { SubmitButton } from '../../components/SubmitButton';

function ResetPassword() {
  const history = useHistory();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract token from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const resetToken = urlParams.get('token');

    if (!resetToken) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Reset Link',
        text: 'The reset link is invalid or has expired.',
      }).then(() => {
        history.push('/hr/login');
      });
      return;
    }

    setToken(resetToken);
  }, [location.search, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Fields Required',
        text: 'Please fill in all fields.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Passwords Do Not Match',
        text: 'Please make sure both passwords are the same.',
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Too Short',
        text: 'Password must be at least 6 characters long.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword({ token, newPassword });

      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Your password has been reset successfully. Please login with your new password.',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        history.push('/hr/login');
      });
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-3 mb-5 mb-lg-0"></div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <h2 className="text-tiny">
                        <span className="">Reset Password</span>
                      </h2>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="newPassword">New Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          className="form-control"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          minLength="6"
                          required
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

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          className="form-control"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          minLength="6"
                          required
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            onClick={toggleConfirmPasswordVisibility}
                            style={{ cursor: 'pointer' }}
                          >
                            <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <SubmitButton
                      text={'Reset Password'}
                      onClick={handleSubmit}
                      isSubmitting={isSubmitting}
                    />

                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => history.push('/hr/login')}
                        disabled={isSubmitting}
                      >
                        Back to Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;