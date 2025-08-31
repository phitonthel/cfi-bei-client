import { useMemo, useState } from 'react';
import { Card, Button, Spinner, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getPreviousCfiTypeAssessments } from '../../../../apis/cfi/cfiImport';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

export const UserBanner = ({
  cfiTypeAssessmentId,
  revieweeId,
  reviewerId,
  revieweeFullname,
  onImportSelected,
}) => {
  const authUser = useSelector(state => state.auth.user);
  const [showImportModal, setShowImportModal] = useState(false);

  const {
    data: assessmentsData = [],
    isLoading,
    isError,
  } = useQuery(
    ['getPreviousCfiTypeAssessments', { revieweeId, cfiTypeAssessmentId }],
    ({ queryKey }) => {
      const [_key, { revieweeId, cfiTypeAssessmentId }] = queryKey;
      return getPreviousCfiTypeAssessments({ revieweeId, cfiTypeAssessmentId });
    },
    { enabled: !!revieweeId }
  );

  const [selectedAssessmentName, setSelectedAssessmentName] = useState('');

  const assessmentNames = useMemo(
    () => Array.from(new Set(assessmentsData.map(a => a.cfiTypeAssessmentName))).sort(),
    [assessmentsData]
  );

  const selectedItem = useMemo(() => {
    if (!selectedAssessmentName) return null;
    return assessmentsData.find(a => a.cfiTypeAssessmentName === selectedAssessmentName) || null;
  }, [assessmentsData, selectedAssessmentName]);

  const noPrevious = !isLoading && !isError && assessmentNames.length === 0;

  return (
    <>
      {/* Sticky top banner */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1020,
          background: '#fff',
        }}
      >
        <Card className="mb-3 shadow-sm">
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
              <Card.Title as="h4" className="mb-0">{revieweeFullname}</Card.Title>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setShowImportModal(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="mr-2" /> Loading…
                </>
              ) : (
                'Import Assessment'
              )}
            </Button>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import from CFI Assessment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isError && (
            <Alert variant="danger" className="mb-3">
              Failed to load previous assessments.
            </Alert>
          )}

          {noPrevious ? (
            <Alert variant="primary" className="mb-0">
              No previous assessments are available for this user.
            </Alert>
          ) : (
            <>
              <p className="mb-2">Choose a previous CFI assessment to import. Matching scores and justifications will be copied over, and all other responses will remain as they are.</p>
              <Form.Group controlId="selectAssessment" className="mb-0">
                <Form.Label>CFI Assessment</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedAssessmentName}
                  disabled={isLoading || assessmentNames.length === 0}
                  onChange={(e) => setSelectedAssessmentName(e.target.value)}
                >
                  <option value="" disabled>
                    {isLoading ? 'Loading…' : 'Select an assessment'}
                  </option>
                  {assessmentNames.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </>
          )}
        </Modal.Body>

        {!noPrevious && (
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={!selectedItem}
              style={
                !selectedItem
                  ? { opacity: 1, backgroundColor: '#007bff', borderColor: '#007bff', cursor: 'not-allowed' }
                  : {}
              }
              onClick={() => {
                onImportSelected?.({
                  selectedItem,
                  revieweeId,
                  reviewerId,
                  cfiTypeAssessmentId,
                });
                setShowImportModal(false);
              }}
            >
              Import Now
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
