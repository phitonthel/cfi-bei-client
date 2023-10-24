import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

import { nominatePeer } from '../../apis/assessment/nominatePeer';
import { unnominatePeer } from '../../apis/assessment/unnominatePeer';
import { fetchNomination } from '../../apis/user/fetchNomination';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import NominatePeersModal from '../../components/Modal/NominatePeersModal';

function NominatePeers() {
  const [listUser, setListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useSelector(state => state.auth.user);

  const handleNominatePeer = async (userId) => {
    try {
      console.log("Nominate User ID:", userId);
      console.log("List of Users:", listUser);

      listUser.forEach(user => {
        console.log(`User ID: ${user.id}, Status: ${user.status}, Level: ${user.level}`);
      });

      const selectedUser = listUser.find(user => user.id === userId);
      if (!selectedUser) throw new Error("User not found");

      const nominatedStaff = listUser.filter(user => user.status === 'Nominated' && user.level === 'Staf').length;
      const nominatedKadiv = listUser.filter(user => user.status === 'Nominated' && user.level === 'Kepala Divisi').length;
      const nominatedKanit = listUser.filter(user => user.status === 'Nominated' && user.level === 'Kepala Unit').length;

      console.log('cek ini', nominatedStaff)

      if (selectedUser.level === 'Staf' && nominatedStaff > 3) {
        throw new Error("You can't nominate more than 3 staff members");
      }
      else if (selectedUser.level === 'Kepala Divisi' && nominatedKadiv > 3 ) {
        throw new Error("You can't nominate more than 3 Kepala Divisi");
      }
      else if (selectedUser.level === 'Kepala Unit' && nominatedKanit > 2 ) {
        throw new Error("You can't nominate more than 2 Kepala Unit");
      }

      await nominatePeer({
        revieweeId: authUser.id,
        reviewerId: userId,
      });
      fireSwalSuccess({ text: 'User Nominated Successfully!' });
      await initListUser();
    } catch (error) {
      console.error(error);
      fireSwalError(error);
    }
  }

  const handleUnnominatePeer = async (userId) => {
    try {
      await unnominatePeer({
        revieweeId: authUser.id,
        reviewerId: userId,
      });
      fireSwalSuccess({ text: 'User Un-nominated Successfully!' });
      await initListUser();
    } catch (error) {
      console.error("Error unnominating user:", error);
      fireSwalError(error);
    }
  }

  const initListUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchNomination();
      if (data.message) {
        Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        setListUser(data.map(user => ({
          id: user.id,
          fullname: user.fullname,
          division: user.Division ? user.Division.name : 'N/A',
          level: user.level,
          status: user.status,
        })));
      }
    } catch (error) {
      fireSwalError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initListUser();
  }, []);

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
      selector: row => row.status,
      cell: row => (
        <span style={{ color: row.status === 'Nominated' ? 'navy' : 'darkred' }}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: <h4>Actions</h4>,
      button: true,
      cell: row => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              lineHeight: '1',
              borderRadius: '0.2rem',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleNominatePeer(row.id)}
          >
            Nominate
          </button>
          <button
            className="btn btn-danger btn-sm"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              lineHeight: '1',
              borderRadius: '0.2rem',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleUnnominatePeer(row.id)}
          >
            Un-nominate
          </button>
        </div>
      ),
    }
  ];

  const instructions = [
    'Anda diminta untuk memilih...',
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className='m-4'>
        <ExpandableInstructions instructions={instructions} />
      </div>
      <div className="d-flex justify-content-end m-2">
        <NominatePeersModal
          modalTitle={'Nominate Peers'}
          buttonText={'Nominate Peers From Other Division'}
          onFormSubmit={initListUser}
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
