import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DataTable from 'react-data-table-component';

import { Card } from './Card'

const columns = [
  {
    name: <h4>Category</h4>,
    selector: row => row.category,
    cell: row => <div style={{ fontSize: 16, fontWeight: 800 }}>{row.category}</div>,
    sortable: true,
  },
  {
    name: <h4>Title</h4>,
    selector: row => row.title,
    cell: row => <div style={{ fontSize: 16, fontWeight: 800 }}>{row.title}</div>,
    sortable: true,
  },
  {
    name: <h4>Level</h4>,
    cell: row => row.level,
  },
  {
    name: <h4>Actions</h4>,
    cell: row => row.actions,
  },
];

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])
  const [assessmentForm, setFormAssessment] = useState({})

  const [assessmentForms, setFormAssessments] = useState({})


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

  // const handlerButton = (assessmentId, score) => {
  //   assessments.forEach(assessment => {
  //     if (assessment.id === assessmentId) {
  //       assessment.assignedScore = score
  //     }
  //   });
  //   console.log({assessments})
  //   setAssessments(assessments)
  // }

  useEffect(() => {
    axios.get('http://localhost:8001/assessment/self', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        localStorage.setItem('self_assessment', '{}')
        setAssessments(response.data.map(assessment => {
          return {
            id: assessment.id,
            assignedScore: assessment.assignedScore,
            reviewerScore: assessment.reviewerScore,
            category: assessment.CompetencyRole.Competency.category,
            title: assessment.CompetencyRole.Competency.title,
            description: assessment.CompetencyRole.Competency.description,
            options: assessment.CompetencyRole.Competency.options,
            shouldShowCriterias: false
            // level: Radios(assessment.id, handleRadioWithLocalStorage),
            // actions: <div className='d-flex justify-content-center'>
            //   <a href='#' className='text-danger mx-2'><b>See Detail</b></a>
            // </div>
          }
        }));
      });
  }, [])

  return (
    <>
      {/* <span className="badge badge-primary">
        {assessments.filter(assessment => assessment.assignedScore).length} / {assessments.length} Assessments
      </span> */}

      {/* <DataTable
        columns={columns}
        data={assessments}
      /> */}

      <div className='col-10'>
        <div className='mb-4'>
          <h4>Instructions</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        {
          assessments.map(assessment => Card(assessment, handlers))
        }

        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" onClick={() => handlers.submit()}>
            Submit {assessments.filter(assessment => assessment.assignedScore).length} / {assessments.length} Assessments
          </button>
        </div>
      </div>
    </>
  );
};

export default SelfAssessment