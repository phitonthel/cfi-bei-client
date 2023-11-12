import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { faker } from '@faker-js/faker'
import DataTable from 'react-data-table-component';

import { unnominateUser } from '../../../apis/tsAssessment/unnominateUser';
import { fetchReviewNomination } from '../../../apis/user/fetchReviewNomination';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import NominateUserModal from '../../../components/Modal/NominateUserModal';
import ApproveUserModal from '../../../components/Modal/ApproveUserModal'
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import { handleApprovalUser, handleUnapprovalUser } from './utils';
import ApproveAllNominationButton from './ApproveAllNominationButton';
import { columns } from './vars';
import FilteredDataTable from '../../../components/FilteredDataTable';

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
          feedbackCompleted: nomination.feedbackCompleted,
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

      <FilteredDataTable
        columns={columns}
        data={nominations}
        filterKeys={['revieweeFullname', 'revieweeDivision', 'revieweeLevel', 'reviewerFullname', 'reviewerDivision', 'reviewerLevel']}
      />
    </>
  );
};

export default ReviewNomination