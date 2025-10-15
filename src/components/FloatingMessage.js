import React, { useState } from 'react';

import { Toast } from 'react-bootstrap';
import styled from 'styled-components';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const FloatingToast = styled.div`
  position: fixed;
  top: 100px;
  right: 75px;
  z-index: 9999;
`;

export const FloatingMessage = ({ title, text, secondaryText, onDiscard }) => {
  const [showToast, setShowToast] = useState(true);

  const handleDiscard = async () => {
    const result = await Swal.fire({
      title: `Discard Changes?`,
      text: `Your form will return to its previous state, and any local changes will be discarded. Proceed?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes`,
      cancelButtonText: `Cancel`,
    })

    if (!result.isConfirmed) {
      return false
    }

    onDiscard();
  };

  return (
    <FloatingToast>
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header closeButton>
          <strong className="mr-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>
          <div>{text}</div>
          {secondaryText && (
            <div style={{ fontSize: '0.8rem', color: 'gray', marginTop: '5px' }}>
              {secondaryText}
              <FontAwesomeIcon icon={faTrash} onClick={handleDiscard} style={{ marginLeft: "0.5rem", cursor: 'pointer' }} />
            </div>
          )}
        </Toast.Body>
      </Toast>
    </FloatingToast>
  );
};
