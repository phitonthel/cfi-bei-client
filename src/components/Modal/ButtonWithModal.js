import React, { useState } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';

const ButtonWithModal = ({
  buttonText,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send data to a server, etc.
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>{buttonText}</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="input1">
              <Form.Label>Peers</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text for input 1"
                value={input1Value}
                onChange={(e) => setInput1Value(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Reviewed By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text for input 2"
                value={input2Value}
                onChange={(e) => setInput2Value(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ButtonWithModal;