import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useTable } from 'react-table'
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Title',
    selector: row => row.title,
  },
  {
    name: 'Year',
    selector: row => row.year,
  },
];

const rows = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]

function DivisionReport() {
  const [assessments, setAssessments] = useState([])


  useEffect(() => {
  }, [])

  return (
    <>
      <div className='col-12'>
        <DataTable
          columns={columns}
          data={rows}
        />

      </div>
    </>
  );
};

export default DivisionReport