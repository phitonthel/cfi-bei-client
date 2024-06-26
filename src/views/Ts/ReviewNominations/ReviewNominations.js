import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

import ApproveAllNominationButton from './ApproveAllNominationButton';
import { handleApprovalUser, handleUnapprovalUser } from './utils';
import { columns } from './vars';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import { fetchReviewNomination } from '../../../apis/user/fetchReviewNomination';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import FilteredDataTable from '../../../components/FilteredDataTable';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import NominateUserModal from '../../../components/Modal/NominateUserModal';

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
        <span
          className="badge badge-danger mx-1"
          style={{ cursor: 'pointer ' }}
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
        </span>
        <span
          className="badge badge-primary mx-1"
          style={{ cursor: 'pointer ' }}
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
        </span>
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
          revieweeFullname: nomination.Reviewee?.fullname,
          revieweeDivision: nomination.Reviewee?.Division.name,
          revieweeLevel: nomination.Reviewee?.level,
          reviewerFullname: nomination.Reviewer?.fullname,
          reviewerDivision: nomination.Reviewer?.Division.name,
          reviewerLevel: nomination.Reviewer?.level,
          feedbackCompleted: nomination.feedbackCompleted,
          isNominatedByReviewee: nomination.isNominatedByReviewee,
          isApproved: nomination.isApproved,
          actions: Actions({
            reviewee: nomination?.Reviewee,
            reviewer: nomination?.Reviewer,
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
        <DownloadCsvButton
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