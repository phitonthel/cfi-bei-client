import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <h4>Name</h4>,
    selector: row => row.fullname,
    sortable: true,
  },
  {
    name: <h4>Division</h4>,
    selector: row => row.division,
    sortable: true,
  },
  {
    name: <h4>Role</h4>,
    selector: row => row.role,
    sortable: true,
  },
  {
    name: <h4>Status</h4>,
    cell: row => row.status,
  },
  {
    name: <h4>Approval</h4>,
    cell: row => row.approval,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function Subordinates() {
  const history = useHistory()

  const [subordinates, setSubordinates] = useState([])

  const Actions = (userId) => {
    return (
      <div>
        <a href='#' className="badge badge-primary mx-1"
          onClick={() => {
            localStorage.setItem('peer_id', userId)
            history.push('/admin/peer-assessment')
          }}
        >
          Assess
        </a>
        <a href='#' className="badge badge-success mx-1">
          Approve
        </a>
      </div>
    )
  }

  useEffect(() => {
    axios.get("http://localhost:8001/user/list-subordinate", {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        if (response.data.message) {
          return Swal.fire({
            position: 'top',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }

        setSubordinates(response.data.map(user => {
          return {
            id: user.id,
            fullname: user.username,
            division: user.Division.name,
            role: user.Role.name,
            status: user.isFilledByAssigned ? 'FINISHED' : 'UNFINISHED',
            approval: user.isFilledByReviewer ? 'APPROVED' : 'UNAPPROVED',
            actions: Actions(user.id)
          }
        }));
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <>
      <DataTable
        columns={columns}
        data={subordinates}
      />
    </>
  );
};

export default Subordinates