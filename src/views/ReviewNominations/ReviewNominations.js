import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { faker } from '@faker-js/faker';

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { downloadTxtFile } from '../Reports/utils';
import ButtonWithModal from '../../components/Modal/ButtonWithModal'

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
    name: <h4>Reviewer</h4>,
    selector: row => row.reviewer,
    sortable: true,
  },
  {
    name: <h4>Reviewer Division</h4>,
    selector: row => row.reviewerDivision,
    sortable: true,
  },
  {
    name: <h4>Reviewer Level</h4>,
    selector: row => row.reviewerLevel,
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    width: '300px',
    cell: row => row.actions,
  },
];

function Subordinates() {
  const history = useHistory()

  const [subordinates, setSubordinates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <a href='#' className="badge badge-secondary mx-1"
          onClick={() => {
          }}
        >
          Details
        </a>
        <a href='#' className="badge badge-danger mx-1"
          onClick={() => {
          }}
        >
          Un-nominate
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

      const multipliedData = []
      data.slice(0, 2).forEach(user => {
        multipliedData.push(user)
        multipliedData.push(user)
        multipliedData.push(user)
      });

      setSubordinates(multipliedData.map(user => {
        return {
          // id: user.id,
          fullname: user.fullname,
          division: user.Division.name,
          level: user.level,
          reviewer: faker.person.fullName(),
          reviewerDivision: 'Sumber Daya Manusia',
          reviewerLevel: 'Staff',
          actions: Actions(user)
        }
      }));
    } catch (error) {
      console.log({ error })
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const instructions = [
    'Anda diminta untuk memilih...',
  ]

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
        <ExpandableInstructions instructions={instructions} />
      </div>

      <div className="d-flex justify-content-end m-2">
        <ButtonWithModal buttonText={'Nominate Peers'} />
      </div>

      <DataTable
        columns={columns}
        data={subordinates}
        highlightOnHover
      />
    </>
  );
};

export default Subordinates