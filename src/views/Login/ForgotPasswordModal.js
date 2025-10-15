import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { forgotPassword } from '../../apis/user/auth';
import { fireSwalError } from '../../apis/fireSwal';
import { SubmitButton } from '../../components/SubmitButton';

function ForgotPasswordModal({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await forgotPassword(email);

      Swal.fire({
        icon: 'success',
        title: 'Password Reset Email Sent',
        text: 'Please check your email for password reset instructions.',
        confirmButtonText: 'OK'
      });

      setEmail('');
      onHide();
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
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
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll send you a link to reset your password.
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