import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchFeedbackFormUsers } from '../../../apis/user/fetchFeedbackFormUsers';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import BaseInstructions from '../BaseInstructions';
import { setAppAnnouncements, setAppReport } from '../../../redux/appSlice';
import { fetchTsIndividualReportTable } from '../../../apis/report/fetchTsIndividualReportTable';
import FilteredDataTable from '../../../components/FilteredDataTable';

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
    name: <h4>Level</h4>,
    selector: row => row.level,
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function IndividualReports() {
  const history = useHistory()
  const dispatch = useDispatch();

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <a href='#' className="badge badge-primary mx-1"
          onClick={() => {
            dispatch(setAppReport({
              individualReportUser: {
                id: user.id,
                fullname: user.fullname,
              }
            }));
            history.push('/admin/individual-report')
          }}
        >
          See Report
        </a>
      </div>
    )
  }

  useEffect(async () => {
    try {
      let data = await fetchTsIndividualReportTable()

      const users = data.map((user, idx) => {
        return {
          id: user.id,
          fullname: user.fullname,
          division: user.Division?.name,
          level: user.level,
          actions: Actions(user)
        }
      })

      setUsers(users)
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
      </div>
      <FilteredDataTable
        columns={columns}
        data={users}
        filterKeys={['fullname', 'division', 'level']}
      />
    </>
  );
};

export default IndividualReports