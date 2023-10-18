import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddUserModal = ({ buttonText }) => {
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    nik: '',
    fullname: '',
    email: '',
    password: '',
    level: '',
    directorate: '',
    divisionName: '',
    unitName: '',
    location: '',
    roleName: '',
    positionName: '',
  });

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>{buttonText}</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {Object.entries(formData).map(([key, value]) => (
              <Form.Group controlId={key} key={key}>
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${key}`}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModal;
