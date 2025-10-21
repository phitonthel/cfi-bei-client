import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { forgotPassword } from '../../apis/user/auth';
import { fireSwalError } from '../../apis/fireSwal';
import { SubmitButton } from '../../components/SubmitButton';

function ForgotPasswordModal({ show, onHide }) {
  const [nik, setNik] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nik) {
      Swal.fire({
        icon: 'warning',
        title: 'NIK Required',
        text: 'Please enter your NIK.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await forgotPassword(nik);

      Swal.fire({
        icon: 'success',
        title: 'Password Reset Requested',
        text: 'If the NIK is registered, password reset instructions will be sent to the associated email. Please check your inbox or spam folder.',
        confirmButtonText: 'OK'
      });

      setNik('');
      onHide();
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNik('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>NIK</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll send password reset instructions to the email associated with this NIK.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <SubmitButton
            text="Send Reset Link"
            onClick={handleSubmit}
            isSubmitting={isSubmitting}
            variant="primary"
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;