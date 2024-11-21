import React, { useState } from 'react';

import { Toast } from 'react-bootstrap';
import styled from 'styled-components';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const FloatingToast = styled.div`
  position: fixed;
  top: 100px;
  right: 75px;
  z-index: 9999;
`;

export const FloatingMessage = ({ title, text, secondaryText }) => {
  const [showToast, setShowToast] = useState(true);

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
              <FontAwesomeIcon icon={faInfoCircle} className="ml-2" />
              {/* <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip">
                    Click submit to save your changes.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="ml-2" style={{ cursor: 'pointer' }} />
              </OverlayTrigger> */}
            </div>
          )}
        </Toast.Body>
      </Toast>
    </FloatingToast>
  );
};