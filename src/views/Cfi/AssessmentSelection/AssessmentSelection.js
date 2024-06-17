import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useQuery } from 'react-query';
import { Card as BootstrapCard, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import FilteredDataTable from '../../../components/FilteredDataTable';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { SubmitButton } from '../../../components/SubmitButton';
import Instructions from 'components/Instructions';
import { setAppAnnouncements, setUtilities } from '../../../redux/appSlice';
import { fireSwalError } from '../../../apis/fireSwal'
import { fetchCfiTypeAssessments } from '../../../apis/cfi/cfiTypeAssessments';
import { formatISODateToMonthYear } from 'utils/date';

function AssessmentSelection() {
  const { data, error, isLoading } = useQuery(
    'cfiTypeAssessment',
    fetchCfiTypeAssessments,
    {
      onError: fireSwalError,
    }
  );

  const dispatch = useDispatch();
  const history = useHistory()

  const handleClick = (item) => {
    console.log(`Name: ${item.name}, Date: ${item.date}`);
    dispatch(setUtilities({
      cfiTypeAssessment: {
        id: item.id,
        name: item.name,
        config: item.config,
      }
    }));
    history.push('/admin/cfi-route-selections')
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <Instruction>Select assessment to proceed:</Instruction>
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={12} className="mb-2">
            <Card onClick={() => handleClick(item)}>
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{formatISODateToMonthYear(item.createdAt)}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AssessmentSelection

const Instruction = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #555;
`;

const Card = styled(BootstrapCard)`
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled(BootstrapCard.Title)`
  font-size: 1.5rem;
  color: #333;
`;

const CardText = styled(BootstrapCard.Text)`
  color: #666;
`;

const CardBody = styled(BootstrapCard.Body)`
  padding: 1.5rem;
  background-color: #f8f9fa;
`;