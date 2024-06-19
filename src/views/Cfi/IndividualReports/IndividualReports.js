import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { fetchCfiIndividualReportTable } from '../../../apis/report/fetchCfiIndividualReportTable';
import FilteredDataTable from '../../../components/FilteredDataTable';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { setAppReport } from '../../../redux/appSlice';
import { ACCESS_LEVEL } from '../../../routes/const';

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
    const { level } = user
    const {
      KEPALA_DIVISI,
      KEPALA_UNIT,
      KEPALA_KANTOR
    } = ACCESS_LEVEL

    return (
      <div>
        <span
          className="badge badge-primary mx-1"
          style={{ fontSize: '11px', cursor: 'pointer' }}
          onClick={() => {
            dispatch(setAppReport({
              selectedUserReport: {
                id: user.id,
                fullname: user.fullname,
              }
            }));
            history.push('/admin/cfi/individual-report')
          }}
        >
          {/* <FontAwesomeIcon icon={faUserTie} />  */}
          Individual Report
        </span>



        {
          [KEPALA_DIVISI, KEPALA_UNIT, KEPALA_KANTOR].includes(level) &&
          <span
            className="badge badge-secondary mx-1"
            style={{ fontSize: '11px', cursor: 'pointer' }}
            onClick={() => {
              dispatch(setAppReport({
                selectedUserReport: {
                  id: user.id,
                  fullname: user.fullname,
                }
              }));
              history.push('/admin/cfi/graph-report')
            }}
          >
            {/* <FontAwesomeIcon icon={faChartPie} />  */}
            Graph Report
          </span>
        }
      </div>
    )
  }

  useEffect(async () => {
    try {
      let data = await fetchCfiIndividualReportTable()

      const users = data.map((user, idx) => {
        return {
          id: user.id,
          fullname: user.fullname,
          division: user.Division?.name,
          unit: user.unit,
          positionName: user.positionName,
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
        filterKeys={['fullname', 'division', 'unit', 'positionName']}
      />
    </>
  );
};

export default IndividualReports