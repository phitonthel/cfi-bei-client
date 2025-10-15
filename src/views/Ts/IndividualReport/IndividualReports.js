import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { fireSwalError } from '../../../apis/fireSwal';
import { fetchTsIndividualReportTable } from '../../../apis/report/fetchTsIndividualReportTable';
import FilteredDataTable from '../../../components/FilteredDataTable';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Actions from './components/Actions';

const IndividualReports = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTsIndividualReportTable();

        const users = data.map((user) => ({
          ...user,
        }));

        setUsers(users);
      } catch (error) {
        fireSwalError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: <h4>Name</h4>,
      selector: (row) => row.fullname,
      width: '300px',
      sortable: true,
    },
    {
      name: <h4>Division</h4>,
      selector: (row) => row.division,
      sortable: true,
    },
    {
      name: <h4>Level</h4>,
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: <h4>Actions</h4>,
      cell: (row) => <Actions user={row} link={row.link} />,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='m-4' />
      <FilteredDataTable
        columns={columns}
        data={users}
        filterKeys={['fullname', 'division', 'level']}
      />
    </>
  );
};

export default IndividualReports;
