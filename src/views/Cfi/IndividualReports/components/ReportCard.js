import React from 'react';
import { Card, Table, Badge, Row, Col } from 'react-bootstrap';

const CustomBadge = ({ isPassed }) => {
  return (
    <Badge className={isPassed ? 'badge-success ml-auto mt-2' : 'badge-danger ml-auto mt-2'}>
      {isPassed ? 'Meet' : 'Need Development'}
    </Badge>
  );
};

const ReportCard = ({
  title,
  type,
  isPassed,
  selfScore,
  selfJustification,
  reviewerFeedback
}) => {
  return (
    <Row className="justify-content-md-center">
      <Col xs={12}>
        <Card className="mb-3" style={{ width: '100%' }}>
          <Card.Body className="p-4">
            <Card.Title style={{ fontSize: '1.2em' }}>
              <span className="d-flex justify-content-between">
                {title}
                <CustomBadge isPassed={isPassed} />
              </span>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">({type})</Card.Subtitle>
            <Table bordered style={{ fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '4px', width: '20%' }}>Reviewer</th>
                  <th style={{ padding: '4px', width: '10%' }}>Score</th>
                  <th style={{ padding: '4px', width: '70%' }}>Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '4px' }}>Self</td>
                  <td style={{ padding: '4px' }}>
                    {selfScore === null ? <span style={{ color: '#6c757d' }}>(none)</span> : selfScore}
                  </td>
                  <td style={{ padding: '4px' }}>
                    {selfJustification === '' ? <span style={{ color: '#6c757d' }}>(none)</span> : selfJustification}
                  </td>
                </tr>
                {reviewerFeedback.map((feedback, index) => (
                  <tr key={index}>
                    <td style={{ padding: '4px' }}>Reviewer {index + 1}</td>
                    <td style={{ padding: '4px' }}>
                      {feedback.score === null ? <span style={{ color: '#6c757d' }}>(none)</span> : feedback.score}
                    </td>
                    <td style={{ padding: '4px' }}>
                      {feedback.justification === null ? <span style={{ color: '#6c757d' }}>(none)</span> : feedback.justification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReportCard;
