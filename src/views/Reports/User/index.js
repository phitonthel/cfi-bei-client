import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table'
import { useFetch } from '../../../apis/useFetch'
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { fireSwalError } from '../../../apis/fireSwal';
import { downloadCfiIndividualsCsv } from '../../../apis/report/downloadCfiIndividualsCsv';

const UserReport = () => {
  const appUtilities = useSelector(state => state.app.utilities)

  // const { data, error, isLoading } = useQuery(
  //   'downloadCfiIndividualsCsv',
  //   downloadCfiIndividualsCsv,
  //   {
  //     onError: fireSwalError,
  //   }
  // );

  const {
    isLoading,
    data: reports,
  } = useFetch(`/cfi/report/csv/users?cfiTypeAssessmentId=${appUtilities.cfiTypeAssessment.id}`)

  if (isLoading) {
    return (
      <LoadingSpinner text={'This may take few minutes'} />
    )
  }

  return (
    <>
      <div>
        <Table
          reports={reports}
        />
      </div>
    </>
  );
};

export default UserReport