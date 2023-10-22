import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import SearchableDropdown from '../SearchableDropdown'

const NominatePeersModal = ({
  modalTitle,
  buttonText,
  isSuperadmin 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [reviewee, setReviewee] = useState('');
  const [reviewer, setReviewer] = useState('');

  const authUser = useSelector(state => state.auth.user);

  const handleButtonClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', reviewee, reviewer, {authUser});
    // handleCloseModal();
  };

  useEffect(async () => {
    const { data } = await fetchAllUsers();
    setUsers(
      data.sort((a, b) => {
        if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return 1;
        if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) return -1;
        return 0;
      })
    );
  }, []);

  return (
    <div>
      <Button onClick={handleButtonClick}>{buttonText}</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            
            <Form.Group controlId="input1">
              <Form.Label>Reviewee</Form.Label>
              <SearchableDropdown
                users={users}
                onChange={(selectedValue) => setReviewee(selectedValue)}
                selected={reviewee}
              />
            </Form.Group>

            <Form.Group controlId="input2">
              <Form.Label>Reviewer</Form.Label>
              <SearchableDropdown
                users={users}
                onChange={(selectedValue) => setReviewer(selectedValue)}
                selected={reviewer}
              />
            </Form.Group>

            <Button variant="secondary" type="submit" className="float-right">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NominatePeersModal;
