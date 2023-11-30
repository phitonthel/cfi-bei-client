import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

import { fetchReviewNomination } from '../../../apis/user/fetchReviewNomination';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import NominateUserModal from '../../../components/Modal/NominateUserModal';
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import { handleApprovalUser, handleUnapprovalUser } from './utils';
import ApproveAllNominationButton from './ApproveAllNominationButton';
import { columns } from './vars';
import FilteredDataTable from '../../../components/FilteredDataTable';
import { DownloadButton } from '../../../components/DownloadButton';

const createCsv = (data) => {
  if (data.length === 0) return ''

  const headers = `Ratee,Ratee Division,Ratee Level,Rater,Rater Division,Rater Level,Feedback Completed, Nomination,Approval\n`
  let csvs = headers

  let rowBuilder = []
  data.forEach(row => {
    rowBuilder = [] // reset
    rowBuilder.push(row.revieweeFullname)
    rowBuilder.push(row.revieweeDivision)
    rowBuilder.push(row.revieweeLevel)
    rowBuilder.push(row.reviewerFullname)
    rowBuilder.push(row.reviewerDivision)
    rowBuilder.push(row.reviewerLevel)
    rowBuilder.push(row.feedbackCompleted)
    rowBuilder.push(row.isNominatedByReviewee)
    rowBuilder.push(row.isApproved)

    csvs += rowBuilder.join(',') + '\n'
  });

  return csvs
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
        <DownloadButton 
          data={createCsv(nominations)}
          filename={`reviewnominations_${new Date().getTime()}.csv`}
        />

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