import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { approveUser } from '../../apis/tsAssessment/approveNomination';
import { nominateUser } from '../../apis/tsAssessment/nominateUser';
import { nominateUserBySuperadmin } from '../../apis/tsAssessment/nominateUserBySuperadmin';
import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import SearchableDropdown from '../SearchableDropdown'
import { fetchCfiCompetencyRoles } from '../../apis/cfi/cfiCompetencyRoles';
import { createCfiNominationAndAssessments } from '../../apis/cfi/cfiNominations';

const NominateCfiUserModal = ({
  modalTitle,
  buttonText,
  onSubmitFinish,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reviewee, setReviewee] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [cfiRole, setCfiRole] = useState('');

  const [users, setUsers] = useState([]);
  const [cfiRoles, setCfiRoles] = useState([]);

  const authUser = useSelector(state => state.auth.user);
  const appUtilities = useSelector(state => state.app.utilities);

  const handleButtonClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      await createCfiNominationAndAssessments({
        cfiTypeAssessmentId: appUtilities.cfiTypeAssessment.id,
        revieweeId: reviewee.id,
        reviewerId: reviewer.id,
        cfiRole: cfiRole.role
      })

      fireSwalSuccess({ text: 'User Nominated Successfully!' });
    } catch (error) {
      fireSwalError(error, 2000)
    } finally {
      setShowModal(false);
      if (onSubmitFinish) {
        onSubmitFinish();
      }
    }
  };

  useEffect(async () => {
    console.log({ appUtilities })
    const { data: allUsers } = await fetchAllUsers();
    setUsers(
      allUsers.sort((a, b) => {
        if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return 1;
        if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) return -1;
        return 0;
      })
    );

    const { data: competencyRoles } = await fetchCfiCompetencyRoles(appUtilities.cfiTypeAssessment.competencyRoleType);
    setCfiRoles(competencyRoles)
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
            <Form.Group controlId="input1">
              <Form.Label>Ratee</Form.Label>
              <SearchableDropdown
                items={users}
                onChange={(selectedValue) => setReviewee(selectedValue)}
                selected={reviewee}
                field={`fullname`}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Rater</Form.Label>
              <SearchableDropdown
                items={users}
                onChange={(selectedValue) => setReviewer(selectedValue)}
                selected={reviewer}
                field={`fullname`}
              />
            </Form.Group>
            <Form.Group controlId="input3">
              <Form.Label>CFI Position</Form.Label>
              <SearchableDropdown
                items={cfiRoles}
                onChange={(selectedValue) => setCfiRole(selectedValue)}
                selected={cfiRole}
                field={`role`}
              />
            </Form.Group>

            <Button variant="secondary" type="submit" className="float-right">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NominateCfiUserModal;
