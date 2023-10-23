import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

import { nominatePeers } from 'apis/assessment/nominatePeers';

import { unnominatePeers } from '../../apis/assessment/unnominatePeers'
import { fetchNomination } from '../../apis/user/fetchNomination'
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import NominatePeersModal from '../../components/Modal/NominatePeersModal';


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
      <span style={{ color: row.status === 'Nominated' ? 'navy' : 'darkred' }}>
        {row.status}
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



  const nominateUser = async (userId) => {
    try {
      // const selectedUser = listUser.find(user => user.id === userId);
      // if (!selectedUser) throw new Error("User not found");

      // const nominatedStaff = listUser.filter(user => user.status === 'nominated' && user.level === 'staff').length;

      // if (selectedUser.level === 'staff' && nominatedStaff >= 3) {
      //   throw new Error("You can't nominate more than 3 staff");
      // }

      await nominatePeers({
        reviewerId: userId
      });
      fireSwalSuccess({ text: 'User Nominated Successfully!' });
      await initListUser();
    } catch (error) {
      console.log(error);
      fireSwalError(error);
    }
  }
  const unnominateUser = async (userId) => {
    try {
      await unnominatePeers({ reviewerId: userId });
      fireSwalSuccess({ text: 'User Un-nominated Successfully!' });
      await initListUser();
    } catch (error) {
      console.error("Error unnominating user:", error);
      fireSwalError(error);
    }
  }


  const initListUser = async () => {
    try {
      const { data } = await fetchNomination();
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
        division: user.Division.name,
        level: user.level,
        status: user.status,
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
      <button
        className="btn btn-primary btn-sm"
        style={{ padding: '0.25rem 0.5rem' }}
        onClick={(e) => {
          e.preventDefault();
          nominateUser(user.id);
        }}
      >
        Nominate
      </button>

      <button
        className="btn btn-danger btn-sm"
        style={{ padding: '0.25rem 0.5rem' }}
        onClick={(e) => {
          e.preventDefault();
          unnominateUser(user.id);
        }}
      >
        Un-nominate
      </button>
    </div>
  );


  useEffect(() => {
    initListUser();
  }, []);

  const instructions = [
    'Anda diminta untuk memilih...',
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='m-4'>
        <ExpandableInstructions instructions={instructions} />
      </div>
      <div className="d-flex justify-content-end m-2">
        <NominatePeersModal
          modalTitle={'Nominate Peers'}
          buttonText={'Nominate Peers From Other Division'}
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
