import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SearchableDropdown from '../SearchableDropdown'
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { approveNomination } from '../../apis/tsAssessment/approveNomination';

const NominateUserModal = ({
  modalTitle,
  buttonText,
  fetchUserOptions,
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

      await approveNomination({
        revieweeId: reviewee.id || authUser.id,
        reviewerId: reviewer.id
      })

      fireSwalSuccess({ text: 'Nomination created!' });
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
    const { data } = await fetchUserOptions();

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
              <Form.Label>Ratee</Form.Label>
              <SearchableDropdown
                users={users}
                onChange={(selectedValue) => setReviewee(selectedValue)}
                selected={reviewee}
              />
            </Form.Group>

            <Form.Group controlId="input2">
              <Form.Label>Rater</Form.Label>
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

export default NominateUserModal;
