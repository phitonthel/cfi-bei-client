import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import { fetchSubordinates } from '../../apis/user/fetchSubordinates';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';
import { ExpandableInstructions } from '../../components/ExpandableInstructions';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { downloadTxtFile } from '../Reports/utils';
import { DownloadButton } from '../../components/DownloadButton';

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

  const [ratees, setRatees] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const Actions = (user) => {
    return (
      <div>
        <a href='#' className="badge badge-primary mx-1"
          onClick={() => {
            // localStorage.setItem('feedback_form_id', user.id)
            localStorage.setItem('peer_id', user.id)
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
      let { data } = await fetchSubordinates()
      data = data.slice(0, 10).filter(user => user.level !== 'Staf')

      if (data.message) {
        return Swal.fire({
          position: 'top',
          text: data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }

      // temp
      const ni = {
        id: 'xxx',
        fullname: 'NI WAYAN YADNYA WATI',
        division: 'Sumber Daya Manusia',
        level: 'Kepala Divisi',
        feedbackCompleted: '0 / 22 Assessments',
      }

      const users = data.map((user, idx) => {
        return {
          id: user.id,
          fullname: user.fullname,
          division: user.Division.name,
          level: user.level,
          // feedbackCompleted: user.feedbackCompleted,
          feedbackCompleted: '0 / 22 Assessments',
          actions: Actions(user)
        }
      })

      // setRatees(data.map((user, idx) => {
      //   return {
      //     id: user.id,
      //     fullname: user.fullname,
      //     division: user.Division.name,
      //     level: user.level,
      //     // feedbackCompleted: user.feedbackCompleted,
      //     feedbackCompleted: '0 / 22 Assessments',
      //     actions: Actions(user)
      //   }
      // }));

      setRatees([
        ...users,
        {
          id: 'xxx',
          fullname: 'NI WAYAN YADNYA WATI',
          division: 'Sumber Daya Manusia',
          level: 'Kepala Divisi',
          feedbackCompleted: '0 / 22 Assessments',
          actions: Actions(data[0])
        }
      ])

    } catch (error) {
      console.log({ error })
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
        <ExpandableInstructions instructions={instructions} />
      </div>
      <DataTable
        columns={columns}
        data={ratees}
        highlightOnHover
      />
    </>
  );
};

export default FeedbackForms