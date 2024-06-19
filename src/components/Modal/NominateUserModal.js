import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { approveUser } from '../../apis/tsAssessment/approveNomination';
import { nominateUser } from '../../apis/tsAssessment/nominateUser';
import { nominateUserBySuperadmin } from '../../apis/tsAssessment/nominateUserBySuperadmin';
import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import SearchableDropdown from '../SearchableDropdown'

const NominateUserModal = ({
  modalTitle,
  buttonText,
  isSuperadmin, // have the options for 2 input
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

      if (isSuperadmin) {
        await nominateUserBySuperadmin({
          revieweeId: reviewee.id || authUser.id,
          reviewerId: reviewer.id
        })
      } else {
        await nominateUser({
          revieweeId: reviewee.id || authUser.id,
          reviewerId: reviewer.id
        })
      }

      fireSwalSuccess({ text: 'User Nominated Successfully!' });
    } catch (error) {
      fireSwalError(error, 2000)
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
      <Button className='btn btn-sm  mx-1' onClick={handleButtonClick}>{buttonText}</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>

            {
              isSuperadmin &&
              <Form.Group controlId="input1">
                <Form.Label>Ratee</Form.Label>
                <SearchableDropdown
                  users={users}
                  onChange={(selectedValue) => setReviewee(selectedValue)}
                  selected={reviewee}
                />
              </Form.Group>
            }

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
