import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useFetch } from '../../../apis/useFetch'

import Table from './Table'
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const DivisionSingleReport = ({ divisionType }) => {
  const { data: reports } = useFetch(`/report/division-detailed?divisionName=${divisionType}`)
  const [isLoading, setIsLoading] = useState(true)

  if (!reports) return (
    <LoadingSpinner text={'This may take few minutes'} />
  )
  
  return (
    <>
      <div>
        <Table
          reports={reports}
          divisionType={divisionType}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
};

export default DivisionSingleReport