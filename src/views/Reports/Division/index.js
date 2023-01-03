import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DivisionTable from './DivisionTable'
import { LoadingSpinner } from '../../../components/LoadingSpinner'
import { fireSwalError } from '../../../apis/fireSwal';
import { fetchDivisionReport } from '../../../apis/report/division';
import { useFetch } from '../../../apis/useFetch';

const DivisionReport = () => {
  // const [data, setData] = useState(null)
  const { data } = useFetch(`/report/division`)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    // try {
    //   const data = await fetchDivisionReport()
    //   setData(data)
    // } catch (error) {
    //   fireSwalError(error)
    // }
  }, [])

  if (!data) return (
    <LoadingSpinner text={'This may take few minutes'} />
  )

  return (
    <>
      <div>
        <DivisionTable
          data={data}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
};

export default DivisionReport