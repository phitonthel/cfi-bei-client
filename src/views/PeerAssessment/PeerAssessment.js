import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DataTable from 'react-data-table-component';

import { Card } from './Card'

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])
  const [peerName, setPeerName] = useState()

  const handlers = {
    button: (assessmentId, score) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.reviewerScore = score
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
            reviewerScore: assessment.reviewerScore
          }
        })

        const promises = payload.map(e => {
          return axios({
            method: 'POST',
            url: 'http://localhost:8001/assessment/reviewer',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              assessmentId: e.assessmentId,
              reviewerScore: e.reviewerScore,
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
            assignedName: assessment.assigned.username,
            assignedScore: assessment.assignedScore,
            reviewerScore: assessment.reviewerScore,
            category: assessment.CompetencyRole.Competency.category,
            title: assessment.CompetencyRole.Competency.title,
            description: assessment.CompetencyRole.Competency.description,
            options: assessment.CompetencyRole.Competency.options,
            shouldShowCriterias: false
          }
        }));
      });
  }, [])

  return (
    <>
      <div className='col-10'>
        <div>
          <h2>{peerName}</h2>
        </div>

        <div className='mb-4'>
          <h4>Instructions</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        
        {
          assessments.map(assessment => Card(assessment, handlers))
        }

        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" onClick={() => handlers.submit()}>
            Submit {assessments.filter(assessment => assessment.reviewerScore).length} / {assessments.length} Assessments
          </button>
        </div>
      </div>
    </>
  );
};

export default SelfAssessment