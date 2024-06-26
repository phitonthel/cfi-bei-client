import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import SearchableDropdownTable from './SeachableDropdownTable';
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import FilteredDataTable from '../../../components/FilteredDataTable';
import NominateUserModal from '../../../components/Modal/NominateUserModal';
import SearchableDropdown from '../../../components/SearchableDropdown';
import { fetchCfiNominationsForAdmin } from '../../../apis/cfi/cfiNominations';
import { fireSwalError } from 'apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const columns = [
  {
    name: <h4>Reviewee Name</h4>,
    selector: row => row.reviewee.fullname,
    sortable: true,
  },
  {
    name: <h4>Reviewee Position</h4>,
    selector: row => row.reviewee.positionName,
    sortable: true,
  },
  {
    name: <h4>Reviewee Division</h4>,
    selector: row => row.reviewee.Division?.name,
    sortable: true,
  },
  {
    name: <h4>Reviewee Unit</h4>,
    selector: row => row.reviewee.unit,
    sortable: true,
  },
  {
    name: <h4>Reviewer Name</h4>,
    selector: row => row.reviewer.fullname,
    sortable: true,
  },
  {
    name: <h4>Reviewer Position</h4>,
    selector: row => row.reviewer.positionName,
    sortable: true,
  },
  {
    name: <h4>Reviewer Division</h4>,
    selector: row => row.reviewer.Division?.name,
    sortable: true,
  },
  {
    name: <h4>Reviewer Unit</h4>,
    selector: row => row.reviewer.unit,
    sortable: true,
  },
  {
    name: <h4>CFI Competency Role</h4>,
    selector: row => row.reviewee.role,
    sortable: true,
  },
];

const AssigneeManagement = () => {
  // const [tableData, setTableData] = useState(data.map(item => ({ ...item, isSelected: false })));
  // const [tableData, setTableData] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const appUtilities = useSelector(state => state.app.utilities);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cfiTypeAssessmentId = searchParams.get('cfiTypeAssessmentId');

  const { data: cfiNominations, error, isLoading } = useQuery(
    ['cfiNominations', { cfiTypeAssessmentId }],
    fetchCfiNominationsForAdmin,
    {
      onError: fireSwalError,
    }
  );

  console.log('cfiNominations:', cfiNominations);

  const handleAddSelectedUsers = () => {
    const selectedUsers = tableData.filter(item => item.isSelected);
    console.log('Selected Users:', selectedUsers);
  };

  // dummy
  const users = []

  // const rows = tableData.map((row, idx) => {
  //   return {
  //     ...row,
  //     cfiProfile: <SearchableDropdownTable
  //       users={users}
  //       onChange={() => console.log('Selected User')}
  //       selected={users[idx]}
  //     />
  //   }
  // })

  // useEffect(async () => {
  //   const { data } = await fetchAllUsers();
  //   console.log('All Users:', data);
  //   setTableData(data);
  // }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="d-flex justify-content-end align-items-end mb-2">
        <Button onClick={handleAddSelectedUsers}>Add Selected Users</Button>
      </div>
      <FilteredDataTable
        columns={columns}
        data={cfiNominations}
        // 'Division.name' doesnt work
        filterKeys={['fullname', 'Division.name', 'positionName', 'unit']}
        // otherProps={{ selectableRows: true }}
      />
    </div>
  );
};

export default AssigneeManagement;
