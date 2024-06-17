import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { convertISODateToDDMMYYYY } from '../../../utils/date'
import Instructions from '../../../components/Instructions';

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
    name: <h4>Position</h4>,
    selector: row => row.positionName,
    width: '300px',
    sortable: true,
  },
  {
    name: <h4>Last Updated</h4>,
    selector: row => row.updatedAt,
    sortable: true,
  },
  {
    name: <h4>Self Review</h4>,
    selector: row => row.assigned,
    sortable: true,
  },
  {
    name: <h4>Supervisor Review</h4>,
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
        <span
          className="badge badge-primary p-1"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            localStorage.setItem('peer_id', user.id)
            history.push('/admin/cfi/peer-assessment-table')
          }}
        >
          Assess
        </span>
      </div>
    )
  }

  const createCsv = () => {
    let headers = `Name,Division,Position,Self Review,Supervisor Review,Total Assessment\n`

    subordinates.forEach(subordinate => {
      headers += subordinate.fullname + ','
      headers += subordinate.division + ','
      headers += `"${subordinate.positionName}"` + ','
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
          division: user.Division?.name,
          positionName: user.positionName,
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
        <Instructions texts={[
          'Anda diminta untuk melakukan Penilaian terhadap kompetensi technical/behaviour bawahan langsung Anda (staf/kepala kantor/kepala unit)',
          'Pilih tombol "assess" pada salah satu Anggota untuk mulai menilai masing-masing Anggota tim Anda'
        ]}
        />
      </div>

      <div className="d-flex justify-content-end m-2">
        <DownloadCsvButton
          data={createCsv()}
          filename={`subordinates_${new Date().getTime()}.csv`}
        />
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