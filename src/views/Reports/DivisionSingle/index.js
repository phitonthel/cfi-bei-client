import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Table from './Table'

const DivisionSingleReport = () => {
  // const [isConvertedToDataTable, setIsConvertedToDataTable] = useState(false)

  const renderTable = () => {
    $('#divisionSingle').DataTable({
      dom: 'frtip',
      // buttons: [
      //   'copy', 'csv', 'excel', 'pdf', 'print'
      // ],
      scrollX: true,
    });
  }

  useEffect(() => {
    renderTable()
    // setIsConvertedToDataTable(true)
  }, [])

  return (
    <>
      <div className='col-12'>
        <Table />
      </div>
    </>
  );
};

export default DivisionSingleReport