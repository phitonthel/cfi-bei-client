
import React, { useState, useEffect } from 'react';

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

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';


function OpenFeedbackForm({ setOpenAssessments }) {
  const [user, setUser] = useState({})
  const [input, setInput] = useState({});


  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput({
      ...input,
      [name]: value,
    });

    setOpenAssessments({
      ...input,
      [name]: value,
    })
  };

  useEffect(async () => {
    try {
      // const data = await fetchSelfDetail()
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  const handleSubmit = async () => {
  };

  return (
    <>
      <Card className="p-3">
        <Card.Header>
          <Card.Title as="h4">Open Ended Questions</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Row>
              <Col className="" md="12">
                <Form.Group>
                  <label>Continue</label>
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Good behaviour to continue"
                    type="text"
                    name="continue"
                    as="textarea"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="" md="12">
                <Form.Group>
                  <label>Start to Do</label>
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Good behaviour to start"
                    type="text"
                    name="start"
                    as="textarea"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="" md="12">
                <Form.Group>
                  <label>Stop to Do</label>
                  <Form.Control
                    onChange={handleChange}
                    placeholder="Good behaviour to stop"
                    type="text"
                    name="stop"
                    as="textarea"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* <Button
              className=""
              type="submit"
              variant="info"
            >
              Submit
            </Button> */}
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default OpenFeedbackForm;
