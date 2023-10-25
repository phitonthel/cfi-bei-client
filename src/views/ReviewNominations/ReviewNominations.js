import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { faker } from '@faker-js/faker';

import DataTable from 'react-data-table-component';
import { unnominatePeer } from '../../apis/assessment/unnominatePeer';
import { fetchReviewNomination } from '../../apis/user/fetchReviewNomination';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { downloadTxtFile } from '../Reports/utils';
import ButtonWithModal from '../../components/Modal/ButtonWithModal'
import NominatePeersModal from '../../components/Modal/NominatePeersModal';

const columns = [
  {
    name: <h4>Reviewee</h4>,
    selector: row => row.revieweeFullname,
    sortable: true,
  },
  {
    name: <h4>Reviewee Division</h4>,
    selector: row => row.revieweeDivision,
    sortable: true,
  },
  {
    name: <h4>Reviewee Level</h4>,
    selector: row => row.revieweeLevel,
    sortable: true,
  },
  {
    name: <h4>Reviewer</h4>,
    selector: row => row.reviewerFullname,
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

const handleUnnominatePeer = async ({
  reviewer,
  reviewee,
  initNominations,
}) => {
  try {
    await unnominatePeer({
      revieweeId: reviewee.id,
      reviewerId: reviewer.id,
    });
    fireSwalSuccess({ text: 'User Un-nominated Successfully!' });
  } catch (error) {
    fireSwalError(error);
  } finally {
    await initNominations()
  }
}

function ReviewNomination() {
  const history = useHistory()

  const [nominations, setNominations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = ({
    reviewer,
    reviewee,
  }) => {
    return (
      <div>
        <a href='#' className="badge badge-danger mx-1"
          onClick={(e) => {
          e.preventDefault();
          handleUnnominatePeer({
            reviewer,
            reviewee,
            initNominations,
          });
        }}
        >
          Un-nominate
        </a>
      </div>
    )
  }

  const initNominations = async () => {
    try {
      const { data } = await fetchReviewNomination()

      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }

      setNominations(data.map(nomination => {
        return {
          id: nomination.id,
          revieweeFullname: nomination.Reviewee.fullname,
          revieweeDivision: nomination.Reviewee.Division.name,
          revieweeLevel: nomination.Reviewee.level,
          reviewerFullname: nomination.Reviewer.fullname,
          reviewerDivision: nomination.Reviewer.Division.name,
          reviewerLevel: nomination.Reviewer.level,
          actions: Actions({
            reviewee: nomination.Reviewee,
            reviewer: nomination.Reviewer,
          })
        }
      }));
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(async () => {
    await initNominations()
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
      <NominatePeersModal
          modalTitle={'Nominate Peers'}
          buttonText={'Nominate Peers'}
          isSuperadmin={true}
          onFormSubmit={() => {
            initNominations()
          }}
        />
      </div>

      <DataTable
        columns={columns}
        data={nominations}
        highlightOnHover
      />
    </>
  );
};

export default ReviewNomination