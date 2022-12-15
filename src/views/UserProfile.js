
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { fetchSelfDetail } from '../apis/user/fetchSelfDetail';
import { updateProfile } from '../apis/user/updateProfile';
import { fireSwalError } from '../apis/fireSwal';


function User() {
  const [user, setUser] = useState({})
  const [input, setInput] = useState({});


  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(async () => {
    try {
      const data = await fetchSelfDetail()
      setUser({
        username: data.username,
        password: data.password,
        division: data.Division.name,
        role: data.Role.name,
        email: data.email
      })
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await updateProfile({
        username: input.username,
        email: input.email
      })
    } catch (error) {
      fireSwalError(error)
    }
  };

  return (
    <>
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
                        <Form.Control
                          defaultValue="Bursa Efek Indonesia"
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Division (disabled)</label>
                        <Form.Control
                          defaultValue={user.division}
                          disabled
                          placeholder="Division"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Role (disabled)</label>
                        <Form.Control
                          defaultValue={user.role}
                          disabled
                          placeholder="Role"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>NIK (disabled)</label>
                        <Form.Control
                          defaultValue={user.nik}
                          disabled
                          placeholder="Company"
                          type="text"
                          name="nik"

                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          onChange={handleChange}
                          defaultValue={user.email}
                          placeholder="Email"
                          type="text"
                          name="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Old Password</label>
                        <Form.Control
                          defaultValue={user.password}
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>New Password</label>
                        <Form.Control
                          onChange={handleChange}
                          defaultValue=""
                          placeholder="New Password"
                          type="password"
                          name="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className=""
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default User;
