import React, { useState, useEffect } from 'react';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippy.js/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css';
import DataTable from 'react-data-table-component';
import { useQuery, useQueryClient } from 'react-query';

import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import FilteredDataTable from '../../components/FilteredDataTable';
import AddUserModal from '../../components/Modal/AddUserModal'
import EditUserModal from '../../components/Modal/EditUserModal'
import { downloadTxtFile } from '../Reports/utils';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { fetchUsersForSuperadmin } from '../../apis/user/users';
import { GenericDownloadCsvButton } from '../../components/Buttons/DownloadButtons';

// Columns are defined per-render inside the component (columnsInside)

function UserManagement() {
  const history = useHistory()
  const queryClient = useQueryClient()

  const { data: users, error, isLoading } = useQuery(
    'fetchUsersForSuperadmin',
    fetchUsersForSuperadmin,
    {
      onError: fireSwalError,
    }
  );

  const columnsInside = [
    {
      name: <h4>NIK</h4>,
      selector: row => row.nik,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Name</h4>,
      selector: row => row.fullname,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Email</h4>,
      selector: row => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Division</h4>,
      selector: row => row.division,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Unit</h4>,
      selector: row => row.unit,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Level</h4>,
      selector: row => row.level,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Competency Mapping</h4>,
      selector: row => row.role,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Password</h4>,
      selector: row => row.password,
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>MFA Enabled</h4>,
      selector: row => row.isMfaEnabled ? 'Yes' : 'No',
      sortable: true,
      wrap: true,
    },
    {
      name: <h4>Actions</h4>,
      cell: row => (
        <EditUserModal
          user={row}
          onSaved={() => {
            queryClient.invalidateQueries('fetchUsersForSuperadmin')
          }}
          buttonText={'Update'}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
        columns={columnsInside}
        data={users}
        filterKeys={['nik', 'email', 'fullname', 'division', 'unit', 'position', 'level', 'role']}
      />
    </>
  );
};

export default UserManagement