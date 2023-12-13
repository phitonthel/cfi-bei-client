import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { updateUser } from '../../apis/user/user-management/updateUser'; 

const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ ...user });

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser(user.id, formData);
            onUpdate(); // Callback to refresh the user list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Failed to update user:', error);
            
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    {/* NIK */}
                    <Form.Group controlId="nik">
                        <Form.Label>NIK</Form.Label>
                        <Form.Control
                            type="text"
                            name="nik"
                            value={formData.nik}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Fullname */}
                    <Form.Group controlId="fullname">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Level */}
                    <Form.Group controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control
                            type="text"
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Directorate */}
                    <Form.Group controlId="directorate">
                        <Form.Label>Directorate</Form.Label>
                        <Form.Control
                            type="text"
                            name="directorate"
                            value={formData.directorate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Division Name */}
                    <Form.Group controlId="divisionName">
                        <Form.Label>Division Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="divisionName"
                            value={formData.divisionName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Unit Name */}
                    <Form.Group controlId="unitName">
                        <Form.Label>Unit Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="unitName"
                            value={formData.unitName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Location */}
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Role Name */}
                    <Form.Group controlId="roleName">
                        <Form.Label>Role Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="roleName"
                            value={formData.roleName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Position Name */}
                    <Form.Group controlId="positionName">
                        <Form.Label>Position Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="positionName"
                            value={formData.positionName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserModal;
