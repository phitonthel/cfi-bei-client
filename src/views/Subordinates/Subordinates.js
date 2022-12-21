import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';

const columns = [
  {
    name: <h4>Name</h4>,
    selector: row => row.fullname,
    width: '300px',
    sortable: true,
  },
  {
    name: <h4>Division</h4>,
    selector: row => row.division,
    sortable: true,
  },
  {
    name: <h4>Role</h4>,
    selector: row => row.role,
    width: '500px',
    sortable: true,
  },
  {
    name: <h4>Assigned</h4>,
    selector: row => row.assigned,
    sortable: true,
  },
  {
    name: <h4>Reviewed</h4>,
    selector: row => row.reviewed,
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function Subordinates() {
  const history = useHistory()

  const [subordinates, setSubordinates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <a href='#' className="badge badge-primary mx-1"
          onClick={() => {
            localStorage.setItem('peer_id', user.id)
            history.push('/admin/peer-assessment-table')
          }}
        >
          Assess
        </a>
        {/* <a href='#' className="badge badge-success mx-1">
          Approve
        </a> */}
      </div>
    )
  }

  useEffect(async () => {
    try {
      const { data } = await fetchSubordinates()
      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }

      setSubordinates(data.map(user => {
        return {
          id: user.id,
          fullname: user.fullname,
          division: user.Division.name,
          // role: user.Role.name,
          role: user.positionName,
          assigned: user.assignedStatus,
          reviewed: user.reviewerStatus,
          actions: Actions(user)
        }
      }));
    } catch (error) {
      console.log({ error })
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const instructions = [
    'Anda diminta untuk melakukan penilaian terhadap kompetensi technical/behavioural bawahan langsung Anda (staf/kepala kantor/kepala unit).',
    'Pilih menu assess untuk mulai menilai masing-masing anggota tim Anda.'
  ]

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <>
      <div className='m-4'>
        <ExpandableInstructions instructions={instructions} />
      </div>
      <DataTable
        columns={columns}
        data={subordinates}
        highlightOnHover
      />
    </>
  );
};

export default Subordinates