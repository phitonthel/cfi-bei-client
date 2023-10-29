import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SearchableDropdown from './SearchableDropdown';
import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import { nominatePeer } from '../../apis/assessment/nominatePeer';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

const NominatePeersModal = ({ modalTitle, buttonText, onFormSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [peers, setPeers] = useState([]);
  const [supervisor, setSupervisor] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  const authUser = useSelector(state => state.auth.user);

  const handleButtonClick = () => {
    setShowModal(true);
    fetchUsers();
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (reviewer) {
        await nominatePeer({
          revieweeId: authUser.id,
          reviewerId: reviewer.id
        });
        fireSwalSuccess({ text: 'User Nominated Successfully!' });
        if (onFormSubmit) onFormSubmit();
      } else {
        fireSwalError({ text: 'Please select a reviewer.' });
      }
    } catch (error) {
      fireSwalError({ text: error.message });
    } finally {
      setShowModal(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await fetchAllUsers();
      const sortedUsers = data.sort((a, b) => a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase()));
      setUsers(sortedUsers);
  
      const peerCandidates = sortedUsers.filter(user => user.level === authUser.level && user.id !== authUser.id);
      console.log("Peer Candidates:", peerCandidates);  
      setPeers(peerCandidates);
  
      const supervisorLevel = getSupervisorLevel(authUser.level);
      const supervisorCandidate = sortedUsers.find(user => user.level === supervisorLevel);
      if (supervisorCandidate) setSupervisor(supervisorCandidate);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getSupervisorLevel = (userLevel) => {
    switch (userLevel) {
      case "Kepala Divisi": return "Direktur";
      case "Kepala Unit": return "Kepala Divisi";
      case "Kepala Kantor": return "Kepala Unit";
      default: return "";
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>{buttonText}</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            
              <Form.Group controlId="peers">
                <Form.Label>Peers</Form.Label>
                <SearchableDropdown options={peers} onChange={setReviewer} value={reviewer} />
              </Form.Group>
           

            <Form.Group controlId="supervisor">
              <Form.Label>Supervisor</Form.Label>
              <SearchableDropdown options={[supervisor]} onChange={setSupervisor} value={supervisor} isDisabled={true} />
            </Form.Group>

            
              <Form.Group controlId="reviewer">
                <Form.Label>Other Divison</Form.Label>
                <SearchableDropdown options={users} onChange={setReviewer} value={reviewer} />
              </Form.Group>
           

            <Button variant="secondary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NominatePeersModal;
