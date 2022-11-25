import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <h4>Category</h4>,
    selector: row => row.category,
    cell: row =>
      <div style={{ fontSize: 16 }}>
        {row.category}
        <a href='#' className="badge badge-secondary mx-2">
          ...
        </a>
      </div>,
    sortable: true,
  },
  {
    name: <h4>Title</h4>,
    selector: row => row.title,
    cell: row => <div style={{ fontSize: 16 }}>{row.title}</div>,
    sortable: true,
  },
  {
    name: <h4>Expected Score</h4>,
    cell: row => <div style={{ fontSize: 16 }}>{row.expectedScore}</div>,
  },
  {
    name: <h4>Assigned Score</h4>,
    cell: row => <div style={{ fontSize: 16 }}>{row.assignedScore}</div>,
  },
  {
    name: <h4>Reviewer Score</h4>,
    cell: row => <div style={{ fontSize: 16 }}>{row.reviewerScore}</div>,
  },
];

const renderScore = (score) => {
  if (score === 1) return 'KNOWLEDGEABLE'
  if (score === 2) return 'PRACTITIONER'
  if (score === 3) return 'ADVANCED'
  if (score === 4) return 'EXPERT'
  return 'N/A'
}

const renderDropdown = () => {
  return (
    <select className="form-select form-select-sm" aria-label=".form-select example">
      <option selected>Override Assigned Score:</option>
      <option value="1">KNOWLEDGEABLE</option>
      <option value="2">PRACTITIONER</option>
      <option value="3">ADVANCED</option>
      <option value="3">EXPERT</option>
    </select>
  )
}

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])
  const [peerName, setPeerName] = useState()


  const handleRadio = (e, assessmentId) => {
    setFormAssessment({
      ...assessmentForm,
      [assessmentId]: e.target.value
    })
  }

  const handleClickButton = () => { }

  const handleRadioWithLocalStorage = (e, assessmentId) => {
    const currentStorage = JSON.parse(localStorage.getItem('self_assessment'))
    const payload = {
      ...currentStorage,
      [assessmentId]: e.target.value
    }
    localStorage.setItem('self_assessment', JSON.stringify(payload))
    setFormAssessment(payload)
  }

  const handlers = {
    button: (assessmentId, score) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.assignedScore = score
        }
      });
      setAssessments([...assessments])
    },
    expand: (assessmentId) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.shouldShowCriterias = assessment.shouldShowCriterias
            ? false
            : true
        }
      });
      setAssessments([...assessments])
    },
    submit: async () => {
      try {
        const payload = assessments.map(assessment => {
          return {
            assessmentId: assessment.id,
            assignedScore: assessment.assignedScore
          }
        })

        const promises = payload.map(e => {
          return axios({
            method: 'POST',
            url: 'http://localhost:8001/assessment/assigned',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              assessmentId: e.assessmentId,
              assignedScore: e.assignedScore,
            }
          });
        })

        await Promise.all(promises)

        Swal.fire({
          position: 'top',
          icon: 'success',
          text: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        })
      } catch (error) {
        console.log({ error })
        Swal.fire({
          position: 'top',
          icon: 'error',
          text: 'Please submit all the assessment!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }
  }

  useEffect(() => {
    const assignedId = localStorage.getItem('peer_id')
    axios.get(`http://localhost:8001/assessment/detail?assignedId=${assignedId}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        setPeerName(response.data[0].assigned.username)
        setAssessments(response.data.map(assessment => {
          return {
            id: assessment.id,
            assignedScore: renderScore(assessment.assignedScore),
            // reviewerScore: assessment.reviewerScore,
            reviewerScore: renderDropdown(),
            expectedScore: renderScore(assessment.CompetencyRole.expectedScore),
            category: assessment.CompetencyRole.Competency.category,
            title: assessment.CompetencyRole.Competency.title,
            description: assessment.CompetencyRole.Competency.description,
            options: assessment.CompetencyRole.Competency.options,
          }
        }));
      });
  }, [])
  return (
    <>
      <div className='col-12'>
        <div>
          <h2>{peerName}</h2>
        </div>

        <div className='mb-4'>
          <h4>Instructions</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <DataTable
          columns={columns}
          data={assessments}
        />

        <div className="d-flex flex-row-reverse my-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => handlers.submit()}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SelfAssessment