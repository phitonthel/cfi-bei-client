import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

import { nominateUser } from '../../../apis/tsAssessment/nominateUser';
import { unnominateUser } from '../../../apis/tsAssessment/unnominateUser'
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import NominatePeersModal from '../../../components/Modal/NominateUserModal';
import { fetchTsPeerTable } from '../../../apis/user/fetchTsPeerTable';
import { fetchAllTsPeers } from '../../../apis/user/ts/fetchAllTsPeers';
import Instructions from './Instructions';


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
    name: <h4>Status</h4>,
    selector: 'status',
    cell: row => (
      <span style={{ color: row.status ? 'navy' : 'darkred' }}>
        {row.status ? 'Nominated' : 'Unnominated'}
      </span>
    ),
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function NominatePeers() {
  const history = useHistory();
  const [listUser, setListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authUser = useSelector(state => state.auth.user);

  const handleNominateUser = async (userId) => {
    try {
      await nominateUser({
        revieweeId: authUser.id,
        reviewerId: userId,
      });
      fireSwalSuccess({ text: 'User Nominated Successfully!' });
      await initListUser();
    } catch (error) {
      fireSwalError(error, 2000);
    }
  }
  const handleUnnominateUser = async (userId) => {
    try {
      await unnominateUser({
        revieweeId: authUser.id,
        reviewerId: userId,
      });
      fireSwalSuccess({ text: 'User Un-nominated Successfully!' });
      await initListUser();
    } catch (error) {
      fireSwalError(error, 2000);
    }
  }


  const initListUser = async () => {
    try {
      const { data } = await fetchTsPeerTable();
      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        });
      }
      setListUser(data.map(user => ({
        id: user.id,
        fullname: user.fullname,
        division: user.Division?.name,
        level: user.level,
        status: user.isNominatedByReviewee,
        actions: Actions(user)
      })));
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const Actions = (user) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <a
        href='#'
        className="badge badge-primary p-1"
        onClick={(e) => {
          e.preventDefault();
          handleNominateUser(user.id);
        }}
      >
        Nominate
      </a>

      <a
        href='#'
        className="badge badge-danger p-1"
        onClick={(e) => {
          e.preventDefault();
          handleUnnominateUser(user.id);
        }}
      >
        Un-nominate
      </a>
    </div>
  );


  useEffect(() => {
    initListUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='m-4'>
        < Instructions />
      </div>
      <div className="d-flex justify-content-end m-2">
        <NominatePeersModal
          modalTitle={'Nominate Peers'}
          buttonText={'Nominate Peers From Other Division'}
          fetchUserOptions={fetchAllTsPeers}
          onFormSubmit={() => {
            initListUser()
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={listUser}
        highlightOnHover
        defaultSortField="fullname"
        defaultSortAsc={true}
      />
    </>
  );
}

export default NominatePeers;
