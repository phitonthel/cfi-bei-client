import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { createCfiTypeAssessment } from '../../../apis/cfi/cfiTypeAssessments';
import { fireSwalSuccess } from '../../../apis/fireSwal';
import { fireSwalError } from '../../../apis/fireSwal';

const AddCfiTypeAssessmentModal = ({ title, buttonLabel, onSubmitFinish }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    assessmentName: '',
    cfiCompetencyRoleType: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await createCfiTypeAssessment({
        name: formData.assessmentName,
        competencyRoleType: formData.cfiCompetencyRoleType || null
      })
      fireSwalSuccess({ text: 'CFI Assessment created successfully' });
      onSubmitFinish();
      handleClose();
    } catch (error) {
      fireSwalError(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCFIAssessment">
              <Form.Label>Assessment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assessment name"
                name="assessmentName"
                value={formData.assessmentName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCfiCrType">
              <Form.Label>CFI Competency Role Type</Form.Label>
              <Form.Control
                as="select"
                name="cfiCompetencyRoleType"
                value={formData.description}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="CFI_2023">CFI_2023</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>
            {/* Add more form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCfiTypeAssessmentModal;
