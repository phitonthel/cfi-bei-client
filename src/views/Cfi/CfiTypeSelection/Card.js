import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setUtilities } from '../../../redux/appSlice';

const CustomCard = ({
  title,
  description,
  icon,
  link,
  progressBarLabel,
  progressBarValue,
  assessmentType,
  disabled, // Add disabled prop
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.user);

  const handleClick = () => {
    if (disabled) return; // Prevent click if disabled

    if (assessmentType === 'TECHNICAL') {
      dispatch(setUtilities({
        cfiAssessment: {
          userId: authUser.id,
          userFullname: authUser.fullname,
          type: 'TECHNICAL',
          isSelfReview: true,
        }
      }));
    }
    if (assessmentType === 'BEHAVIOURAL') {
      dispatch(setUtilities({
        cfiAssessment: {
          userId: authUser.id,
          userFullname: authUser.fullname,
          type: 'BEHAVIOURAL',
          isSelfReview: true,
        }
      }));
    }
    history.push(link);
  };

  return (
    <Card
      className="mb-3"
      onClick={handleClick}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s',
        height: '250px',
        opacity: disabled ? 0.5 : 1, // Apply opacity if disabled
      }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={e => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
        <div className="mb-3">
          <FontAwesomeIcon icon={icon} size="2x" />
        </div>
        <Card.Title className="mb-2" style={{ fontWeight: 'bold' }}>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {progressBarLabel && (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <ProgressBar now={progressBarValue * 100} label={progressBarLabel} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
