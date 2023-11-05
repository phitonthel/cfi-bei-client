import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { faker } from '@faker-js/faker'
import DataTable from 'react-data-table-component';
import CustomDataTable from './FilteredDataTable';

import { unnominateUser } from '../../../apis/tsAssessment/unnominateUser';
import { fetchReviewNomination } from '../../../apis/user/fetchReviewNomination';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import NominateUserModal from '../../../components/Modal/NominateUserModal';
import ApproveUserModal from '../../../components/Modal/ApproveUserModal'
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import { handleApprovalUser, handleUnapprovalUser } from './utils';
import ApproveAllNominationButton from './ApproveAllNominationButton';

const columns = [
  {
    name: <h4>Ratee</h4>,
    selector: row => row.revieweeFullname,
    sortable: true,
  },
  {
    name: <h4>Ratee Division</h4>,
    selector: row => row.revieweeDivision,
    sortable: true,
  },
  {
    name: <h4>Ratee Level</h4>,
    selector: row => row.revieweeLevel,
    sortable: true,
  },
  {
    name: <h4>Rater</h4>,
    selector: row => row.reviewerFullname,
    sortable: true,
  },
  {
    name: <h4>Rater Division</h4>,
    selector: row => row.reviewerDivision,
    sortable: true,
  },
  {
    name: <h4>Rater Level</h4>,
    selector: row => row.reviewerLevel,
    sortable: true,
  },
  {
    name: <h4>Nomination</h4>,
    selector: 'isNominatedByReviewee',
    cell: row => (
      <span style={{ color: row.isNominatedByReviewee ? 'navy' : 'darkred' }}>
        {row.isNominatedByReviewee ? 'Nominated' : 'Unnominated'}
      </span>
    ),
    sortable: true,
  },
  {
    name: <h4>Approval</h4>,
    selector: 'isApproved',
    cell: row => (
      <span style={{ color: row.isApproved ? 'navy' : 'darkred' }}>
        {row.isApproved ? 'Approved' : 'Unnapproved'}
      </span>
    ),
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    width: '300px',
    cell: row => row.actions,
  },
];

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
            handleUnapprovalUser({
              reviewer,
              reviewee,
              initNominations,
            });
          }}
        >
          Un-approve
        </a>
        <a href='#' className="badge badge-primary mx-1"
          onClick={(e) => {
            e.preventDefault();
            handleApprovalUser({
              reviewer,
              reviewee,
              initNominations,
            });
          }}
        >
          Approve
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
          isNominatedByReviewee: nomination.isNominatedByReviewee,
          isApproved: nomination.isApproved,
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
        {/* <ExpandableInstructions instructions={instructions} /> */}
      </div>

      <div className="d-flex justify-content-end m-2">
        <ApproveAllNominationButton 
          buttonText={'Approve All'}
          onFormSubmit={() => {
            initNominations()
          }}
        />
        <NominateUserModal
          modalTitle={'Create Nomination'}
          buttonText={'Create Nomination'}
          isSuperadmin={true}
          fetchUserOptions={fetchAllUsers}
          onFormSubmit={() => {
            initNominations()
          }}
        />
      </div>

      <CustomDataTable
        columns={columns}
        data={nominations}
      // highlightOnHover
      />
    </>
  );
};

export default ReviewNomination