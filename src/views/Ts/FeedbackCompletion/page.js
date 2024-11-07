import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

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

function FeedbackCompletion() {
  const history = useHistory()

  const [nominations, setNominations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const initNominations = async () => {
    try {
      const { data } = await fetchReviewNomination(true)

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
          revieweeDivision: nomination.Reviewee?.division,
          revieweeLevel: nomination.Reviewee?.level,
          reviewerFullname: nomination.Reviewer?.fullname,
          reviewerDivision: nomination.Reviewer?.division,
          reviewerLevel: nomination.Reviewer?.level,
          feedbackCompleted: nomination.feedbackCompleted,
          isNominatedByReviewee: nomination.isNominatedByReviewee,
          isApproved: nomination.isApproved,
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
      </div>

      <FilteredDataTable
        columns={columns}
        data={nominations}
        filterKeys={['revieweeFullname', 'revieweeDivision', 'revieweeLevel', 'reviewerFullname', 'reviewerDivision', 'reviewerLevel']}
      />
    </>
  );
};

export default FeedbackCompletion