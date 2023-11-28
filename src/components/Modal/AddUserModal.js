import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { addUser } from 'apis/user/user-management/addUser';
import directorateOptions from './data/directorateOptions';
import levelOptions from './data/levelOptions';
import unitOptions from './data/unitOptions';
import positionOptions from './data/positionOptions';
import locationOptions from './data/locationOptions';
import divisionOptions from './data/divisionOptions';
import roleOptions from './data/roleOptions';

const AddUserModal = ({ buttonText }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await addUser(formData);
            console.log(response); // handle response
            handleCloseModal();
        } catch (err) {
            setError('Failed to add user. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={handleButtonClick}>{buttonText}</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                    <Form onSubmit={handleFormSubmit}>
                        {/* Form fields for each formData property */}
                        {Object.entries(formData).map(([key, value]) => {
                            const selectOptions = {
                                directorate: directorateOptions,
                                level: levelOptions,
                                divisionName: divisionOptions, 
                                unitName: unitOptions,         
                                location: locationOptions,
                                roleName: roleOptions,         
                                positionName: positionOptions, 
                            }[key];

                            if (selectOptions) {
                                return (
                                    <Form.Group controlId={key} key={key}>
                                        <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                        <Form.Control as="select" name={key} value={value} onChange={handleInputChange}>
                                            <option value="">Select {key}</option>
                                            {selectOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                );
                            } else {
                                return (
                                    <Form.Group controlId={key} key={key}>
                                        <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name={key}
                                            value={value}
                                            onChange={handleInputChange}
                                            placeholder={`Enter ${key}`}
                                        />
                                    </Form.Group>
                                );
                            }
                        })}
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddUserModal;
