import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

function OpenFeedbackForm({ initialTsEssayAssessments, setTsEssayAssessments }) {
  const [inputs, setInputs] = useState([]);
  const renderedLabels = {}; // This object will help track which labels we've already rendered.

  useEffect(() => {
    const groupByType = (type) => {
      return initialTsEssayAssessments.filter(tsEA => tsEA.type === type);
    };

    setInputs([
      ...groupByType('STRENGTH'),
      ...groupByType('START'),
      ...groupByType('WEAKNESS')
    ]);
  }, [initialTsEssayAssessments]);

  const handleChange = (id, e) => {
    const value = e.target.value;
    const updatedInputs = inputs.map(item =>
      item.id === id ? { ...item, feedback: value } : item
    );

    setInputs(updatedInputs);
    setTsEssayAssessments(updatedInputs);  // Update the parent's state
  };

  const renderFormGroups = () => {
    return inputs.map(item => (
      <Row key={item.id}>
        <Col md="12">
          <Form.Group>
            {
              !renderedLabels[item.type] && <Form.Label>{item.type}</Form.Label>
            }
            <Form.Control
              onChange={(e) => handleChange(item.id, e)}
              placeholder={`Good behaviour to ${item.type.toLowerCase()}`}
              type="text"
              value={item.feedback}
              as="textarea"
            ></Form.Control>
          </Form.Group>
        </Col>
        {
          // Set the label as rendered after rendering it
          (renderedLabels[item.type] = true)
        }
      </Row>
    ));
  };

  return (
    <>
      <Card className="p-3">
        <Card.Header>
          <Card.Title as="h4">Open Ended Questions</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            {renderFormGroups()}
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default OpenFeedbackForm;
