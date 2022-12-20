import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

import { submitScore } from '../../apis/assessment/submitScore';
import { fetchById } from '../../apis/assessment/fetchById';
import { fireSwalError, fireSwalSuccess } from '../../apis/fireSwal';

const renderScore = (score) => {
  if (score === 1) return 'KNOWLEDGEABLE'
  if (score === 2) return 'PRACTITIONER'
  if (score === 3) return 'ADVANCED'
  if (score === 4) return 'EXPERT'
  return 'N/A'
}

function SelfAssessment() {
  const [assessments, setAssessments] = useState([])
  const [peerName, setPeerName] = useState()

  const renderDropdown = (propAssessment) => {
    return (
      <select className="form-select form-select-sm" aria-label=".form-select example" value={propAssessment.reviewerScore ?? undefined}
        onChange={(e) => {
          const reviewerInputScore = e.target.value

          setAssessments((assessments) => {
            assessments.forEach(assessment => {
              if (assessment.id === propAssessment.id) {
                assessment.reviewerScore = reviewerInputScore
              }
            });

            return [...assessments]
          })
        }
        }>
        <option disabled>SELECT SCORE</option>
        <option value={1}>KNOWLEDGEABLE</option>
        <option value={2}>PRACTITIONER</option>
        <option value={3}>ADVANCED</option>
        <option value={4}>EXPERT</option>
      </select >
    )
  }

  const handlers = {
    submit: async () => {
      try {
        const promises = assessments.map(e => {
          return submitScore({
            assessmentId: e.id,
            reviewerScore: e.reviewerScore ?? 1
          })
        })

        await Promise.all(promises)

        fireSwalSuccess('Your work has been saved!')
      } catch (error) {
        fireSwalError(error)
      }
    }
  }

  useEffect(async () => {
    try {
      const assignedId = localStorage.getItem('peer_id')
      const { data } = await fetchById({ assignedId })
      setPeerName(data[0].assigned.fullname)

      setAssessments(data.map(assessment => {
        return {
          id: assessment.id,
          assignedScore: renderScore(assessment.assignedScore),
          reviewerScore: assessment.reviewerScore,
          expectedScore: renderScore(assessment.CompetencyRole.expectedScore),
          category: assessment.CompetencyRole.Competency.category,
          title: assessment.CompetencyRole.Competency.title,
          description: assessment.CompetencyRole.Competency.description,
          options: assessment.CompetencyRole.Competency.options,
        }
      }));
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  const columns = [
    {
      id: 'category',
      name: <h4>Category</h4>,
      selector: row => row.category,
      cell: row =>
        <div style={{ fontSize: 16 }}>
          {row.category}
        </div>,
      sortable: true,
    },
    {
      name: <h4>Title</h4>,
      selector: row => row.title,
      cell: row =>
        <div style={{ fontSize: 16 }}>
          {row.title}
          {/* <a href='#' className="badge badge-secondary mx-2">
            ...
          </a> */}
        </div>,
      sortable: true,
      width: '500px'
    },
    {
      name: <h4>Expected Score</h4>,
      cell: row => <div style={{ fontSize: 16 }}>{row.expectedScore}</div>,
    },
    {
      name: <h4>Assigned Score</h4>,
      // cell: row => <div style={{ fontSize: 16 }}>{row.assignedScore}</div>,
      cell: row => <div style={{ fontSize: 16 }}>{row.assignedScore}</div>,
    },
    {
      name: <h4>Reviewer Score</h4>,
      // cell: row => <div style={{ fontSize: 16 }}>{row.reviewerScore}</div>,
      cell: row => renderDropdown(row)
    },
  ];

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
          defaultSortFieldId="category"
          highlightOnHover
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