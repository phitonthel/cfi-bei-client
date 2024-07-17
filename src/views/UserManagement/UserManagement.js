import React, { useState, useEffect } from 'react';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippy.js/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import FilteredDataTable from '../../components/FilteredDataTable';
import AddUserModal from '../../components/Modal/AddUserModal'
import { downloadTxtFile } from '../Reports/utils';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { fetchUsersForSuperadmin } from '../../apis/user/users';
import { GenericDownloadCsvButton } from '../../components/Buttons/DownloadButtons';

const columns = [
  {
    name: <h4>NIK</h4>,
    selector: row => row.nik,
    sortable: true,
  },
  {
    name: <h4>Name</h4>,
    selector: row => row.fullname,
    sortable: true,
  },
  {
    name: <h4>Email</h4>,
    selector: row => row.email,
    sortable: true,
  },
  {
    name: <h4>Division</h4>,
    selector: row => row.division,
    sortable: true,
  },
  {
    name: <h4>Unit</h4>,
    selector: row => row.unit,
    sortable: true,
  },
  {
    name: <h4>Position</h4>,
    selector: row => row.positionName,
    sortable: true,
  },
  {
    name: <h4>CFI Position</h4>,
    selector: row => row.cfiRole,
    sortable: true,
  },
  {
    name: <h4>Password</h4>,
    selector: row => row.password,
    sortable: true,
  },
];

function UserManagement() {
  const history = useHistory()

  const { data: users, error, isLoading } = useQuery(
    'fetchUsersForSuperadmin',
    fetchUsersForSuperadmin,
    {
      onError: fireSwalError,
    }
  );

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

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>

      <div className="d-flex justify-content-end m-2">
        {/* < AddUserModal buttonText={'ADD NEW USER'} /> */}
        <GenericDownloadCsvButton
          title={'Download CSV'}
          array={users}
          filename={`${new Date().getTime()}_users.csv`}
        />
      </div>

      < FilteredDataTable
        columns={columns}
        data={users}
        filterKeys={['nik','email','fullname', 'division', 'unit', 'position']}
      />
    </>
  );
};

export default UserManagement