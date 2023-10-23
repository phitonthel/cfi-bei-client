import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import SearchableDropdown from '../SearchableDropdown'
import { nominatePeers } from '../../apis/assessment/nominatePeers';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

const NominatePeersModal = ({
  modalTitle,
  buttonText,
  isSuperadmin,
  onFormSubmit: notifyParent
}) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [reviewee, setReviewee] = useState('');
  const [reviewer, setReviewer] = useState('');

  const authUser = useSelector(state => state.auth.user);

  const handleButtonClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      await nominatePeers({
        revieweeId: reviewee.id || authUser.id,
        reviewerId: reviewer.id
      })

      fireSwalSuccess({ text: 'User Nominated Successfully!' });
    } catch (error) {
      fireSwalError(error)
    } finally {
      setShowModal(false);
      if (notifyParent) {
        notifyParent();
      }
    }
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

            {
              isSuperadmin &&
              <Form.Group controlId="input1">
                <Form.Label>Reviewee</Form.Label>
                <SearchableDropdown
                  users={users}
                  onChange={(selectedValue) => setReviewee(selectedValue)}
                  selected={reviewee}
                />
              </Form.Group>
            }

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
