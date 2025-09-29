import { en } from '@faker-js/faker';
import PageBreakPrint from 'components/Reports/PageBreakPrint';
import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const Justifications = ({
  reports,
}) => {
  const createTsAssessmentDummy = () => {
    return [
      {
        type: 'Supervisors',
        avgScore: 4,
        justifications: [
          'Good job',
        ]
      },
      {
        type: 'Self',
        avgScore: 4,
        justifications: [
          'Good job',
        ]
      },
      {
        type: 'Peers',
        avgScore: 3.5,
        justifications: [
          'Good job A',
          'Good job B',
        ]
      },
      {
        type: 'Subordinates',
        avgScore: 3.5,
        justifications: [
          'Good job C',
          'Good job D',
          'Good job E',
        ]
      }
    ];
  }

  return (
    <div className="row p-4">
      <div className="col-md-12">
        <h2>Feedback Justification</h2>

        {
          reports
            .filter(r => r.title !== 'Total Average by Rater')
            .map((report, index) => (
              <Row className="justify-content-md-center">
                <Col xs={12}>
                  {index % 3 === 0 && index !== 0 && <PageBreakPrint />}
                  <Card className="mb-3" style={{ width: '100%' }}>
                    <Card.Body className="p-4">
                      <Card.Title style={{ fontSize: '1.2em', marginBottom: '1rem' }}>
                        <span className="d-flex justify-content-between">
                          {report.title}
                        </span>
                      </Card.Title>
                      <Table bordered style={{ fontSize: '14px' }}>
                        <thead>
                          <tr>
                            <th style={{ padding: '4px', width: '15%' }}>Type</th>
                            <th style={{ padding: '4px', width: '15%' }}>Avg. Score</th>
                            <th style={{ padding: '4px', width: '70%' }}>Justifications</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.justificationTypes?.map((justificationType, index) => (
                            <tr key={index}>
                              <td style={{ padding: '4px' }}>
                                {justificationType.type}
                              </td>
                              <td style={{ padding: '4px' }}>
                                {justificationType.avgScore === null ? <span style={{ color: '#6c757d' }}>(none)</span> : justificationType.avgScore}
                              </td>
                              <td style={{ padding: '4px' }}>
                                {/* Render each justification */}
                                {justificationType.justifications?.length > 0 ? (
                                  <ul style={{ paddingLeft: '20px' }}>
                                    {justificationType.justifications.map((justification, idx) => (
                                      <li key={idx}>{justification}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span style={{ color: '#6c757d' }}>(none)</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))
        }
      </div>
    </div>
  );
};

export default Justifications;
