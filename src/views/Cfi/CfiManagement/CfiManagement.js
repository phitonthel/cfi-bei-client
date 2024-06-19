import React, { useState, useEffect } from 'react';

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

const dummyData = [
  {
    assessmentName: 'Annual CFI Assessment 2020',
    numberOfPeople: 501,
  },
  {
    assessmentName: 'Annual CFI Assessment 2021',
    numberOfPeople: 512,
  },
  {
    assessmentName: 'Annual CFI Assessment 2022',
    numberOfPeople: 511,
  },
  {
    assessmentName: 'Annual CFI Assessment 2023',
    numberOfPeople: 485,
  },
]

function CfiManagement() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    try {
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='col-12'>
        <div className="d-flex justify-content-end align-items-end mb-3">
          <Button variant="primary">Add CFI Assessment</Button>
        </div>
        <div className="d-flex justify-content-end">
          {
            dummyData.map((data, index) => (
              <Card key={index} {...data} />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default CfiManagement