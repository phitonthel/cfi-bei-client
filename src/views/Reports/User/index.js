import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useFetch } from '../../../apis/useFetch'

import Table from './Table'
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const UserReport = ({
  type,
  name
}) => {
  // const query = `?type=${type}&name=${name}`

  const { 
    isLoading,
    data: reports,
   } = useFetch(`/report/user`)

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