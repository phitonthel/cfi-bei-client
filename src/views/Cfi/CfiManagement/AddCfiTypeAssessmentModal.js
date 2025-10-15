import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { createCfiTypeAssessment } from '../../../apis/cfi/cfiTypeAssessments';
import { fireSwalSuccess } from '../../../apis/fireSwal';
import { fireSwalError } from '../../../apis/fireSwal';
import { fetchCfiTypeAssessments } from '../../../apis/cfi/cfiTypeAssessments';

const AddCfiTypeAssessmentModal = ({ title, buttonLabel, onSubmitFinish }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    assessmentName: '',
    cfiCompetencyRoleType: ''
  });

  const { data: cfiTypeAssessments, error, isLoading, refetch } = useQuery(
    'fetchCfiTypeAssessments',
    fetchCfiTypeAssessments,
    {
      onError: fireSwalError,
    }
  );

  const distinctCompetencyRoleTypes = [...new Set(cfiTypeAssessments.map(e => e.competencyRoleType))];

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
                {
                  distinctCompetencyRoleTypes.map((role, index) => <option key={index} value={role}>{role}</option>)
                }
              </Form.Control>
            </Form.Group>
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
