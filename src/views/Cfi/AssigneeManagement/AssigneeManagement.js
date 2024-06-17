import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import FilteredDataTable from '../../../components/FilteredDataTable';
import NominateUserModal from '../../../components/Modal/NominateUserModal';
import SearchableDropdown from '../../../components/SearchableDropdown';
import SearchableDropdownTable from './SeachableDropdownTable';
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';

const data = [
  { id: 1, fullname: 'John Doe', division: 'HR', unit: 'Recruitment', status: 'Assigned' },
  { id: 2, fullname: 'Jane Smith', division: 'Finance', unit: 'Accounting', status: 'Not Assigned' },
  { id: 3, fullname: 'Michael Johnson', division: 'IT', unit: 'Support', status: 'Assigned' },
  // Add more data as needed
];

const columns = [
  {
    name: <h4>Name</h4>,
    selector: row => row.fullname,
    sortable: true,
  },
  {
    name: <h4>Position</h4>,
    selector: row => row.positionName,
    sortable: true,
  },
  {
    name: <h4>Division</h4>,
    selector: row => row.Division?.name,
    sortable: true,
  },
  {
    name: <h4>Unit</h4>,
    selector: row => row.unit,
    sortable: true,
  },
  {
    name: <h4>Status</h4>,
    selector: row => row.status ? 'Not Assigned' : 'Assigned',
    sortable: true,
  },
  {
    name: <h4>CFI Profile</h4>,
    selector: row => row.cfiProfile,
    sortable: true,
  },
];

const AssigneeManagement = () => {
  // const [tableData, setTableData] = useState(data.map(item => ({ ...item, isSelected: false })));
  const [tableData, setTableData] = useState(data);
  const [selectAll, setSelectAll] = useState(false);

  const handleAddSelectedUsers = () => {
    const selectedUsers = tableData.filter(item => item.isSelected);
    console.log('Selected Users:', selectedUsers);
  };

  // dummy
  const users = [
    { id: 1, fullname: 'Kepala Unit SDM' },
    { id: 2, fullname: 'Kepala Divisi SDM' },
    { id: 3, fullname: 'Staf SDM' },
  ]

  const rows = tableData.map((row, idx) => {
    return {
      ...row,
      cfiProfile: <SearchableDropdownTable
        users={users}
        onChange={() => console.log('Selected User')}
        selected={users[idx]}
      />
    }
  })

  useEffect(async() => {
    const {data} = await fetchAllUsers();
    console.log('All Users:', data);
    setTableData(data);
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-end align-items-end mb-2">
        <Button onClick={handleAddSelectedUsers}>Add Selected Users</Button>
      </div>
      <FilteredDataTable
        columns={columns}
        data={rows}
        // 'Division.name' doesnt work
        filterKeys={['fullname', 'Division.name', 'positionName', 'unit']}
        otherProps={{ selectableRows: true }}
      />
    </div>
  );
};

export default AssigneeManagement;
