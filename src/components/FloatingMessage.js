import React, { useState } from 'react';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

const FloatingToast = styled.div`
  position: fixed;
  top: 100px;
  right: 100px;
  z-index: 9999;
`;

export const FloatingMessage = ({ title, text }) => {
  const [showToast, setShowToast] = useState(true);

  return (
    <FloatingToast>
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header closeButton>
          <strong className="mr-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </FloatingToast>
  );
};

// export const FloatingMessage = ({
//   title,
//   text,
// }) => {
//   return (
//     <FloatingToast>
//       <Toast show={true}>
//         <Toast.Header>
//           <strong className="mr-auto">{title}</strong>
//         </Toast.Header>
//         <Toast.Body>{text}</Toast.Body>
//       </Toast>
//     </FloatingToast>
//   );
// }