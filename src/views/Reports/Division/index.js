import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DivisionTable from './DivisionTable'
import { LoadingSpinner } from '../../../components/LoadingSpinner'
import { fireSwalError } from '../../../apis/fireSwal';
import { fetchDivisionReport } from '../../../apis/report/division';

const DivisionReport = () => {
  const [isConvertedToDataTable, setIsConvertedToDataTable] = useState(false)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    try {
      const data = await fetchDivisionReport()
      setData(data)
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  return (
    <>
      {loading &&
        <LoadingSpinner text={'This may take few minutes'}/>
      }
      <div className='col-12' style={{ visibility: isConvertedToDataTable ? 'visible' : 'hidden' }}>
        <DivisionTable
          data={data}
          setIsConvertedToDataTable={setIsConvertedToDataTable}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default DivisionReport