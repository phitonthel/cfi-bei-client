import React, { useState, useEffect } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';

import positionOptions from './data/positionOptions.json'
import { updateUserByAdmin } from '../../apis/user/updateProfile'
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

const EditUserModal = ({ user, onSaved, buttonText = 'Update' }) => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    positionName: '',
    division: '',
    unit: '',
    isMfaEnabled: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userId: user.id || user.userId || user._id,
        email: user.email || '',
        positionName: user.positionName || user.position || '',
        division: user.division || '',
        unit: user.unit || '',
        isMfaEnabled: !!user.isMfaEnabled,
      })
    }
  }, [user])

  const handleButtonClick = () => setShowModal(true);
  // Close without saving
  const handleCancel = () => setShowModal(false);

  // Explicit save triggered by Save button
  const handleSave = async () => {
    try {
      const payload = {
        userId: formData.userId,
        email: formData.email,
        division: formData.division,
        unit: formData.unit,
        positionName: formData.positionName,
        isMfaEnabled: formData.isMfaEnabled,
      };

      await updateUserByAdmin(payload);
      fireSwalSuccess('User updated successfully');
      setShowModal(false);
      if (onSaved) onSaved();
    } catch (err) {
      // keep modal open so user can retry and show error
      fireSwalError(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Form is saved when modal closes; we still keep input handlers to update formData live

  return (
    <div style={{ display: 'inline' }}>
      <Button size="sm" variant="primary" onClick={handleButtonClick}>{buttonText}</Button>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="division">
              <Form.Label>Division</Form.Label>
              <Form.Control
                type="text"
                placeholder="Division"
                name="division"
                value={formData.division}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="positionName">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Posisiton"
                name="positionName"
                value={formData.positionName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="isMfaEnabled">
              <Form.Check
                type="switch"
                id={`mfa-switch-${formData.userId}`}
                label={formData.isMfaEnabled ? 'MFA: On' : 'MFA: Off'}
                name="isMfaEnabled"
                checked={formData.isMfaEnabled}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUserModal;
