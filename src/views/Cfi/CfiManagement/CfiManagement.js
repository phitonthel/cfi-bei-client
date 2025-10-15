import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Card from './Card';
import FilteredDataTable from '../../../components/FilteredDataTable';
import Instructions from '../../../components/Instructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { SubmitButton } from '../../../components/SubmitButton';
import AddCfiTypeAssessmentModal from './AddCfiTypeAssessmentModal';
import { fetchCfiTypeAssessments } from '../../../apis/cfi/cfiTypeAssessments';
import { fireSwalError } from '../../../apis/fireSwal';


function CfiManagement() {
  const { data: cfiTypeAssessments, error, isLoading, refetch } = useQuery(
    'fetchCfiTypeAssessments',
    fetchCfiTypeAssessments,
    {
      onError: fireSwalError,
    }
  );

  const onSubmitFinish = () => {
    refetch()
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <div className="d-flex justify-content-end align-items-end mb-3 w-100">
          <div style={{ marginRight: 100}}>
            <AddCfiTypeAssessmentModal
              title="Add CFI Assessment"
              buttonLabel="Add CFI Assessment"
              onSubmitFinish={onSubmitFinish}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-wrap w-100">
          {
            cfiTypeAssessments.map((data, index) => (
              <Card key={data.id} {...data} />
            ))
          }
        </div>
      </div>
    </>

  );
};

export default CfiManagement