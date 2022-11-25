
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

  const [input, setInput] = useState({});

  const [inputUsername, setInputUsername] = useState('')

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    console.log({ value }, { name })

    setInput({
      ...input,
      [name]: value,
    });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('trigger')
    console.log({ input })

    fetch(`http://localhost:8001/user/update-profile`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        username: input.username,
        email: input.email
      }),
    })
      .then((result) => {
        console.log({ result })
      })
      .catch((err) => {
        console.log(err)
      });
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
                        <label>Username</label>
                        <Form.Control
                          onChange={handleChange}
                          defaultValue={user.username}
                          placeholder="Company"
                          type="text"
                          name="username"

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
