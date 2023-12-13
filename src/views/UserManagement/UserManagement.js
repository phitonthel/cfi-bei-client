import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { deleteUser } from '../../apis/user/user-management/deleteUser'
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { downloadTxtFile } from '../Reports/utils';
import AddUserModal from '../../components/Modal/AddUserModal';
import EditUserModal from '../../components/Modal/EditUserModal';
import FilteredDataTable from '../../components/FilteredDataTable';

const columns = [
  {
    name: <h4>NIK</h4>,
    selector: row => row.nik,
    width: '150px',
    sortable: true,
  },
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
    name: <h4>Password</h4>,
    cell: row => (
      <Tippy content={row.password} placement="bottom">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faEye} />
          <span style={{ marginLeft: '5px' }}>Hover to view</span>
        </div>
      </Tippy>
    ),
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function UserManagement() {
  const history = useHistory();

  const [subordinates, setSubordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const Actions = (user) => {
    return (
      <div>
        <a href="#" className="badge badge-primary mx-1"
          onClick={(e) => {
            e.preventDefault();
            setEditingUser(user);
            setShowEditModal(true);
          }}>
          Update
        </a>
        <a href='#' className="badge badge-danger mx-1"
          onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                deleteUser(user.id).then(() => { // Pass the user ID here
                  fireSwalSuccess('Deleted!', 'User has been deleted.');
                  fetchAndUpdateSubordinates(); // Refresh the list
                }).catch(error => {
                  fireSwalError(error);
                });
              }
            });
          }}
        >
          Delete
        </a>
      </div>
    )
  }

  useEffect(async () => {
    try {
      const { data } = await fetchSubordinates()
      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }

      setSubordinates(data.map(user => {
        return {
          id: user.id,
          nik: user.nik,
          fullname: user.fullname,
          division: user.Division?.name,
          level: user.level,
          password: user.password,
          actions: Actions(user)
        }
      }));
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchAndUpdateSubordinates = async () => {
    try {
      const { data } = await fetchSubordinates();
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
        nik: user.nik,
        fullname: user.fullname,
        division: user.Division?.name,
        level: user.level,
        password: user.password,
        actions: Actions(user)
      })));
    } catch (error) {
      fireSwalError(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAndUpdateSubordinates().finally(() => setIsLoading(false));
  }, []);

  const handleUserUpdate = () => {
    setIsLoading(true);
    fetchAndUpdateSubordinates().finally(() => setIsLoading(false));
  };

  return (
    <>

      <div className="d-flex justify-content-end m-2">
        <AddUserModal buttonText="ADD NEW USER" />
        {showEditModal && (
          <EditUserModal
            user={editingUser}
            onClose={() => setShowEditModal(false)}
            onUpdate={handleUserUpdate}
          />
        )}
      </div>

      < FilteredDataTable
        columns={columns}
        data={subordinates}
        filterKeys={['nik', 'fullname', 'division', 'level']}
      />
    </>
  );
};

export default UserManagement