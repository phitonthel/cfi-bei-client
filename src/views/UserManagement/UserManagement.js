import React, { useState, useEffect } from 'react';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippy.js/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css';
import DataTable from 'react-data-table-component';

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import FilteredDataTable from '../../components/FilteredDataTable';
import AddUserModal from '../../components/Modal/AddUserModal'
import { downloadTxtFile } from '../Reports/utils';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const columns = [
  {
    name: <h4>NIK</h4>,
    selector: row => row.nik,
    width: '150px',
    sortable: true,
  },
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
    name: <h4>Level</h4>,
    selector: row => row.level,
    sortable: true,
  },
  {
    name: <h4>Password</h4>,
    cell: row => (
      <Tippy content={row.password} placement="bottom">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faEye} />
          <span style={{ marginLeft: '5px' }}>Hover to view</span>
        </div>
      </Tippy>
    ),
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function UserManagement() {
  const history = useHistory()

  const [subordinates, setSubordinates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <span
          className="badge badge-primary mx-1"
          style={{ cursor: 'pointer ' }}
          onClick={() => {
          }}
        >
          Update
        </span>
        <span
          className="badge badge-danger mx-1"
          style={{ cursor: 'pointer ' }}
          onClick={() => {
          }}
        >
          Delete
        </span>
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
          nik: user.nik,
          fullname: user.fullname,
          division: user.Division?.name,
          level: user.level,
          password: user.password,
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

      <div className="d-flex justify-content-end m-2">
        < AddUserModal buttonText={'ADD NEW USER'} />
      </div>

      < FilteredDataTable
        columns={columns}
        data={subordinates}
        filterKeys={['nik', 'fullname', 'division', 'level']}
      />
    </>
  );
};

export default UserManagement