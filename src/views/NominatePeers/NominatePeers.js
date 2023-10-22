import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { nominatePeers } from 'apis/assessment/nominatePeers';
import { fetchNomination } from '../../apis/user/fetchNomination'
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalNominated } from '../../apis/fireSwal';
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
    selector: row => row.status,
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function Subordinates() {
  const history = useHistory();
  const [subordinates, setSubordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nominateUser = async (userId) => {
    // const updatedSubordinates = subordinates.map(subordinate => {
    //   if (subordinate.id === userId) {
    //     return { ...subordinate, status: 'Nominated' };
    //   }
    //   return subordinate;
    // });
    // setSubordinates(updatedSubordinates);

    try {
      
      await nominatePeers({
        reviewerId: userId
      })
      fireSwalNominated('User Nominated Successfully!');
      await fetchNominationUser();
    } catch (error) {
      const revertedSubordinates = subordinates.map(subordinate => {
        if (subordinate.id === userId) {
          return { ...subordinate, status: 'Un-nominated' };
        }
        return subordinate;
      });
      setSubordinates(revertedSubordinates);
    
      console.error("Error nominating user:", error);
      fireSwalError(error);
    }
  }

 
  const fetchNominationUser= async () => {
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
      setSubordinates(data.map(user => ({
        id: user.id,
        fullname: user.fullname,
        division: user.Division.name,
        level: user.level,
        status: user.status,
        actions: Actions(user)
      })));
    } catch (error) {
      console.log({ error });
      fireSwalError(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const Actions = (user) => (
    <div>
      <a href="#" className="badge badge-primary mx-1" onClick={(e) => {
        e.preventDefault();  
        nominateUser(user.id);
      }}>Nominate</a>
      {/* Add logic for Un-nominate  */}
    </div>
  );

  useEffect(() => {
    fetchNominationUser();
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
        />
      </div>
      <DataTable
        columns={columns}
        data={subordinates}
        highlightOnHover
      />
    </>
  );
}

export default Subordinates;
