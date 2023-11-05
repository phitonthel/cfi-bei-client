import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import directorateOptions from './data/directorateOptions'
import levelOptions from './data/levelOptions'
import unitOptions from './data/unitOptions'
import positionOptions from './data/positionOptions'
import locationOptions from './data/locationOptions'
import divisionOptions from './data/divisionOptions'
import roleOptions from './data/roleOptions'

const AddUserModal = ({ buttonText }) => {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        nik: '',
        fullname: '',
        email: '',
        password: '',
        level: '',
        directorate: '',
        division: '',
        unit: '',
        location: '',
        role: '',
        position: '',
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
                        {Object.entries(formData).map(([key, value]) => {
                            if (key === "directorate") {
                                return (
                                    <Form.Group controlId="directorate" key="directorate">
                                        <Form.Label>Directorate</Form.Label>
                                        <Form.Control as="select" name="directorate" value={formData.directorate} onChange={handleInputChange}>
                                            <option value="" disabled>Select a directorate</option>
                                            {directorateOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "level") {
                                return (
                                    <Form.Group controlId="level" key="level">
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control as="select" name="level" value={formData.level} onChange={handleInputChange}>
                                            <option value="" disabled>Select a level</option>
                                            {levelOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "division") {
                                return (
                                    <Form.Group controlId="division" key="division">
                                        <Form.Label>Division</Form.Label>
                                        <Form.Control as="select" name="division" value={formData.division} onChange={handleInputChange}>
                                            <option value="" disabled>Select a division</option>
                                            {divisionOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "role") {
                                return (
                                    <Form.Group controlId="role" key="role">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control as="select" name="role" value={formData.role} onChange={handleInputChange}>
                                            <option value="" disabled>Select a role</option>
                                            {roleOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "location") {
                                return (
                                    <Form.Group controlId="location" key="location">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control as="select" name="location" value={formData.location} onChange={handleInputChange}>
                                            <option value="" disabled>Select a location</option>
                                            {locationOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "unit") {
                                return (
                                    <Form.Group controlId="unit" key="unit">
                                        <Form.Label>Unit</Form.Label>
                                        <Form.Control as="select" name="unit" value={formData.unit} onChange={handleInputChange}>
                                            <option value="" disabled>Select a unit</option>
                                            {unitOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else if (key === "position") {
                                return (
                                    <Form.Group controlId="position" key="position">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control as="select" name="position" value={formData.position} onChange={handleInputChange}>
                                            <option value="" disabled>Select a position</option>
                                            {positionOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )
                            } else {
                                return (
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
                                );
                            }
                        })}
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






