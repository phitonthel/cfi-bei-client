import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { fetchSelfAssessment, submitSelfAssessment } from '../../apis/assessment/fetchSelf'


import { Card } from './Card'
import { Instructions } from './Instructions'
import { fireSwalSuccess, fireSwalError } from '../../apis/fireSwal';
import { submitScore } from '../../apis/assessment/submitScore';

const SelfAssessment = () => {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(false)

  // handlers for assessment
  const handlers = {
    // for users to input score
    button: (assessmentId, score) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.assignedScore = score
        }
      });
      setAssessments([...assessments])
    },
    // expand/collapse the criterias
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
    // send request to server
    submit: async () => {
      const promises = assessments.map(assessment => {
        return submitScore({
          assessmentId: assessment.id,
          assignedScore: assessment.assignedScore
        })
      })
      await Promise.all(promises)

      fireSwalSuccess('Your work has been saved!')
    }
  }

  useEffect(async () => {
    try {
      const data = await fetchSelfAssessment()
      setAssessments(data)
    } catch (error) {
      fireSwalError(error)
    }
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