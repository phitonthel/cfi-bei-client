import React, { useState } from 'react';

import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { convertISODateToDDMMYYYY } from 'utils/date';
import { updateCfiTypeAssessment } from '../../../apis/cfi/cfiTypeAssessments';
import { fireSwalError } from 'apis/fireSwal';
import { setUtilities } from '../../../redux/appSlice';

const CustomCard = ({ id, name, config, competencyRoleType, createdAt, updatedAt, nominationLength }) => {
  const [settings, setSettings] = useState(config);

  const dispatch = useDispatch();
  const history = useHistory()

  const handleToggle = async (settingId) => {
    try {
      const config = settings.map(setting =>
        setting.id === settingId ? { ...setting, isEnabled: !setting.isEnabled } : setting
      )
      const response = await updateCfiTypeAssessment({ id, config })

      setSettings(config);
    } catch (error) {
      fireSwalError(error);
    }
  };

  const handleOnClick = () => {
    dispatch(setUtilities({
      cfiTypeAssessment: {
        id,
        name,
        config,
        competencyRoleType,
      }
    }));
    history.push(`/admin/cfi-assignee-management`)
  }

  return (
    <Card className="col-3 m-3 p-3" style={{ height: '36rem' }}>
      <Card.Header className='mb-3' style={{ minHeight: '8rem', fontSize: '1.5rem' }}>{name}</Card.Header>
      <Card.Text className="ml-3 text-muted">
        Type: {competencyRoleType}
      </Card.Text>
      <hr></hr>
      <Card.Body>
        <div className="mb-3">
          <p className='pt-1'><strong>Enable/Disable Features:</strong></p>
          {settings.map(setting => (
            <Form.Group key={id + setting.id} controlId={`setting-${setting.id}`} className="d-flex align-items-center">
              <Form.Check
                type="switch"
                id={`switch-${name}-${setting.id}`}
                label={setting.name}
                checked={setting.isEnabled}
                onChange={() => handleToggle(setting.id)}
                className="me-2"
              />
            </Form.Group>
          ))}
        </div>
        <Card.Text className="text-muted">
          Nominations: {nominationLength}
        </Card.Text>
        <Card.Text className="text-muted">
          {convertISODateToDDMMYYYY(createdAt)}
        </Card.Text>
        <Button variant="primary" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }} onClick={handleOnClick}>
          Manage Assignee
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
