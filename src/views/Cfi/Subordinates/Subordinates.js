import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { downloadTxtFile } from '../../Reports/utils';
import { DownloadButton } from '../../../components/DownloadButton';
import { convertISODateToDDMMYYYY } from '../../../utils/date'

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
    width: '450px',
    sortable: true,
  },
  {
    name: <h4>Last Updated</h4>,
    selector: row => row.updatedAt,
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
        <a href='#' className="badge badge-primary p-1"
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

  const createCsv = () => {
    let headers = `Name,Division,Role,Assigned,Reviewed,Total Assessment\n`

    subordinates.forEach(subordinate => {
      headers += subordinate.fullname + ','
      headers += subordinate.division + ','
      headers += subordinate.role + ','
      headers += subordinate.assigned.split(' / ')[0] + ','
      headers += subordinate.reviewed.split(' / ')[0] + ','
      headers += subordinate.reviewed.split(' / ')[1].split(' ')[0] + '\n'
    });

    return headers
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
          role: user.positionName,
          updatedAt: convertISODateToDDMMYYYY(user.updatedAt),
          assigned: user.assignedStatus,
          reviewed: user.reviewerStatus,
          actions: Actions(user)
        }
      }));
    } catch (error) {
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
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
        <ExpandableInstructions instructions={instructions} />
      </div>
      <DownloadButton
        onClick={() => downloadTxtFile(
          createCsv(),
          `subordinates_${new Date().getTime()}.csv`
        )}
      />
      <DataTable
        columns={columns}
        data={subordinates}
        highlightOnHover
      />
    </>
  );
};

export default Subordinates