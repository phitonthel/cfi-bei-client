import React from 'react';

import { Card, ListGroup, Badge, Container, Row, Col, Form } from 'react-bootstrap';

const CustomBadge = ({isPassed}) => {
  //  <Badge className="badge-success ml-auto">{isPassed}</Badge>
  console.log({ isPassed })
  if (isPassed) {
    return <Badge className="badge-success ml-auto">Meet</Badge>
  }

  return <Badge className="badge-danger ml-auto">Need Development</Badge>
}

const ReportCard = ({
  title,
  type,
  isPassed,
  selfScore,
  selfJustification,
  reviewerFeedback
}) => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <Card className="mb-3" style={{ width: '100%' }}>
            <Card.Body className="p-4">
              <Card.Title style={{ fontSize: '1.3em' }}>
                <span className="d-flex justify-content-between">
                  {title}
                  {/* <Badge className="badge-success ml-auto">{isPassed}</Badge> */}
                  <CustomBadge isPassed={isPassed} />
                </span>
              </Card.Title>
              <Card.Title>
                <medium className="text-muted">({type})</medium>
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Self Score: {selfScore}</strong>
                  <Form.Control as="textarea" rows={2} placeholder="-" value={selfJustification} readOnly />
                </ListGroup.Item>
                {reviewerFeedback.map((feedback, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Reviewer {index + 1} Score: {feedback.score}</strong>
                    <Form.Control as="textarea" rows={2} placeholder="-" value={feedback.justification} readOnly />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReportCard;
