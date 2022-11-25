import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


import { Card } from './Card'
import { Instructions } from './Instructions'

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(false)

  // handlers for assessment
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
    axios.get('http://localhost:8001/assessment/self', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        setAssessments(response.data.map(assessment => {
          return {
            id: assessment.id,
            assignedScore: assessment.assignedScore,
            reviewerScore: assessment.reviewerScore,
            expectedScore: assessment.CompetencyRole.expectedScore,
            category: assessment.CompetencyRole.Competency.category,
            title: assessment.CompetencyRole.Competency.title,
            description: assessment.CompetencyRole.Competency.description,
            options: assessment.CompetencyRole.Competency.options,
            shouldShowCriterias: false
          }
        }));
      });
  }, [])

  if (!hasAgreed) {
    return (
      <div className='mb-4'>
        <Instructions setHasAgreed={setHasAgreed} />
      </div>
    )
  }

  return (
    <>
      <div className='col-10'>

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