import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchFeedbackFormUsers } from '../../../apis/user/fetchFeedbackFormUsers';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import BaseInstructions from '../BaseInstructions';

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
    name: <h4>Feedback Given</h4>,
    selector: row => row.feedbackCompleted,
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function FeedbackForms() {
  const history = useHistory()

  const [reviewees, setReviewees] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <a href='#' className="badge badge-primary mx-1"
          onClick={() => {
            localStorage.setItem('360_reviewee_id', user.id)
            localStorage.setItem('360_reviewee_fullname', user.fullname)
            history.push('/admin/feedback-form')
          }}
        >
          Review
        </a>
      </div>
    )
  }

  useEffect(async () => {
    try {
      let { data } = await fetchFeedbackFormUsers()

      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }

      const users = data.map((user, idx) => {
        return {
          id: user.id,
          fullname: user.fullname,
          division: user.Division?.name,
          level: user.level,
          feedbackCompleted: user.feedbackCompleted,
          actions: Actions(user)
        }
      })

      setReviewees(users)

    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const instructions = [
    `Anda diminta untuk melakukan penilaian terhadap kompetensi kolega Anda`,
    `Pilih menu 'Review' untuk mulai menilai masing-masing anggota tim Anda.`
  ]

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
        {/* <ExpandableInstructions instructions={instructions} /> */}
        < BaseInstructions 
          instructions={[
            "Your ratees are in the spotlight and it's review time! Please proceed by clicking the 'Review' button.",
            "Psst.., they will not know that you are reviewing them (unless you tell them of course)"
          ]}
        />
      </div>
      <DataTable
        columns={columns}
        data={reviewees}
        highlightOnHover
      />
    </>
  );
};

export default FeedbackForms