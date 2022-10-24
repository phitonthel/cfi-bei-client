
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

function User() {
  const history = useHistory()

  const [user, setUser] = useState({})

  

  useEffect(() => {
    axios.get(`http://localhost:8001/user/self-detail`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        console.log(response);

        setUser({
          username: response.data.username,
          password: response.data.password,
          division: response.data.Division.name,
          role: response.data.Role.name,
          email: response.data.email
        
        })
      })
      .catch(error => console.log(error));
  }, [])

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
                <Form>
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
                        <label>Username</label>
                        <Form.Control
    
                          defaultValue={user.username}
                          placeholder="Company"
                          type="text"
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={user.email}
                          placeholder="Email"
                          type="text"
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
                          defaultValue=""
                          placeholder="New Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
              
                  <Button
                    className="btn-fill pull-right"
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
