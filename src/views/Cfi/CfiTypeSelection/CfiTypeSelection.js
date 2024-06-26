import React from 'react';

import { faUsers, faClipboardCheck, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomCard from './Card';
import { fetchCfiDetailedTypeAssessments } from '../../../apis/cfi/cfiTypeAssessments';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const CfiTypeSelection = () => {
  const cfiTypeAssessment = useSelector(state => state.app.utilities.cfiTypeAssessment);
  const authUser = useSelector(state => state.auth.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery(
    ['cfiDetailedTypeAssessment', { userId: authUser.id, cfiTypeAssessmentId: cfiTypeAssessment.id }],
    fetchCfiDetailedTypeAssessments,
    {
      onError: () => {},
    }
  );

  if (isLoading) {
    return <LoadingSpinner />
  }

  console.log(data.cfiTypeAssessment.config.find(e => e.name === 'Staff Evaluation').isEnabled);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center p-3">
      <Row className="w-100 justify-content-center mb-4">
        <h3>{cfiTypeAssessment.name}</h3>
      </Row>
      <Row className="w-100 justify-content-center mb-4">
        <Col md={4} className="mb-3">
          <CustomCard
            title="Staff Evaluation"
            description="Evaluate staff performance and provide feedback."
            icon={faUsers}
            link="/admin/cfi/staff-evaluation"
            disabled={!data.cfiTypeAssessment.config.find(e => e.name === 'Staff Evaluation').isEnabled}
          />
        </Col>
        <Col md={4} className="mb-3">
          <CustomCard
            title="Reports"
            description="Generate and view detailed reports."
            icon={faChartBar}
            link="/admin/cfi/individual-reports"
            disabled={!data.cfiTypeAssessment.config.find(e => e.name === 'Reports').isEnabled}
          />
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col md={4} className="mb-3">
          <CustomCard
            title="Technical Assessments"
            description="Take the assessment."
            icon={faClipboardCheck}
            link="/admin/cfi/assessment/technical"
            progressBarLabel={`${data.progress.cfiTechnicalCompleted} / ${data.progress.cfiTechnicalTotal}`}
            progressBarValue={data.progress.cfiTechnicalCompleted / data.progress.cfiTechnicalTotal}
            assessmentType="TECHNICAL"
            disabled={!data.cfiTypeAssessment.config.find(e => e.name === 'Technical Assessment').isEnabled}
          />
        </Col>
        <Col md={4} className="mb-3">
          <CustomCard
            title="Behavioural Assessments"
            description="Take the assessment."
            icon={faClipboardCheck}
            link="/admin/cfi/assessment/behavioural"
            progressBarLabel={`${data.progress.cfiBehaviouralCompleted} / ${data.progress.cfiBehaviouralTotal}`}
            progressBarValue={data.progress.cfiBehaviouralCompleted / data.progress.cfiBehaviouralTotal}
            assessmentType="BEHAVIOURAL"
            disabled={!data.cfiTypeAssessment.config.find(e => e.name === 'Behavioural Assessment').isEnabled}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CfiTypeSelection;
