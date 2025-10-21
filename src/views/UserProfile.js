import React, { useState, useEffect } from 'react';
import {
  Button, Card, Form, Container, Row, Col,
} from "react-bootstrap";
import { fireSwalError, fireSwalSuccess } from '../apis/fireSwal';
import { fetchSelfDetail } from '../apis/user/fetchSelfDetail';
import { updateUserMe } from '../apis/user/updateProfile';

function User() {
  const [user, setUser] = useState({});
  const [input, setInput] = useState({});
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSelfDetail();
        const u = data?.user ?? data ?? {};
        setUser({
          nik: u.nik,
          division: u.division,
          positionName: u.positionName,
          email: u.email,
        });
      } catch (error) {
        fireSwalError(error);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateUserMe({
        oldPassword: input.oldPassword,
        newPassword: input.newPassword,
      });
      fireSwalSuccess({ text: 'Profile updated successfully' });
    } catch (error) {
      fireSwalError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Company (disabled)</label>
                      <Form.Control defaultValue="Bursa Efek Indonesia" disabled type="text" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Division (disabled)</label>
                      <Form.Control defaultValue={user.division} disabled type="text" />
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Position (disabled)</label>
                      <Form.Control defaultValue={user.positionName} disabled type="text" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>NIK (disabled)</label>
                      <Form.Control defaultValue={user.nik} disabled type="text" />
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Email (disabled)</label>
                      <Form.Control
                        defaultValue={user.email}
                        disabled
                        name="email"
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Old Password</label>
                      <Form.Control
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        name="oldPassword"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>New Password</label>
                      <Form.Control
                        onChange={handleChange}
                        placeholder="New Password"
                        type="password"
                        name="newPassword"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="info" disabled={saving}>
                  {saving ? 'Saving…' : 'Update Profile'}
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
