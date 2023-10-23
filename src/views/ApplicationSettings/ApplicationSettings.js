import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { fetchAppSettings } from '../../apis/applicationSetting/fetchAppSettings';
import { fireSwalSuccess, fireSwalError } from '../../apis/fireSwal';
import { setAppSettings } from '../../apis/applicationSetting/setAppSettings';

function ApplicationSettings() {
  const [settings, setSettings] = useState([]);

  const handleToggle = async (id) => {
    try {
      const updatedSettings = settings.map(setting =>
        setting.id === id ? { ...setting, isEnabled: !setting.isEnabled } : setting
      );

      await setAppSettings({
        appSettings: updatedSettings
      })

      setSettings(updatedSettings);

      fireSwalSuccess({ text: 'Successfully updated!'})
    } catch (error) {
      console.log(error);
      fireSwalError(error)
    }
  };

  useEffect(async () => {
    try {
      const { data } = await fetchAppSettings()
      setSettings(data)
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mt-5">
            <Card.Header>
              <Card.Title as="h4">Application Settings</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                {
                  settings.map(setting => (
                    <Form.Group key={setting.id} controlId={`setting-${setting.id}`}>
                      <Form.Check
                        type="switch"
                        id={`switch-${setting.id}`}
                        label={setting.name}
                        checked={setting.isEnabled}
                        onChange={() => handleToggle(setting.id)}
                      />
                    </Form.Group>
                  ))
                }
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplicationSettings;
