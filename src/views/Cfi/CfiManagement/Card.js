import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const CustomCard = ({ assessmentName, numberOfPeople }) => {
  const [settings, setSettings] = useState([
    { id: 1, name: 'Staff Evaluation', isEnabled: false },
    { id: 2, name: 'Behavioural Assessment', isEnabled: false },
    { id: 3, name: 'Technical Assessment', isEnabled: false },
    { id: 4, name: 'Reports', isEnabled: false },
  ]);

  const history = useHistory()

  const handleToggle = (id) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, isEnabled: !setting.isEnabled } : setting
    ));
  };

  const handleOnClick = () => {
    console.log('Manage Assignee');
    history.push('/admin/cfi-assignee-management')
  }

  return (
    <Card className="m-3 p-3" style={{ width: '24rem', height: '32rem' }}>
      <Card.Header className='mb-3' style={{ fontSize: '1.5rem' }}>{assessmentName}</Card.Header>
      <Card.Text className="ml-3 text-muted">
        CFI Mapping 2023
      </Card.Text>
      <Card.Body>
        <div className="mb-3">
          <p className='pt-1'><strong>Enable/Disable Features:</strong></p>
          {settings.map(setting => (
            <Form.Group key={setting.id} controlId={`setting-${setting.id}`} className="d-flex align-items-center">
              <Form.Check
                type="switch"
                id={`switch-${assessmentName}-${setting.id}`}
                label={setting.name}
                checked={setting.isEnabled}
                onChange={() => handleToggle(setting.id)}
                className="me-2"
              />
            </Form.Group>
          ))}
        </div>
        <Card.Text className="text-muted">
          Participants: {numberOfPeople}
        </Card.Text>
        <Button variant="primary" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }} onClick={handleOnClick}>
          Manage Assignee
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
