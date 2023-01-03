import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { fetchSelfAssessment, submitSelfAssessment } from '../../apis/assessment/fetchSelf'


import { AssessmentCard } from '../../components/AssessmentCard'
import { InstructionsTech } from './InstructionsTech'
import { InstructionsBehav } from './InstructionsBehav'
import { fireSwalSuccess, fireSwalError } from '../../apis/fireSwal';
import { submitScore } from '../../apis/assessment/submitScore';
import { SubmitButton } from '../../components/SubmitButton';

const SelfAssessment = (type) => {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    try {
      setIsSubmitting(true)
      const promises = assessments.map(assessment => {
        return submitScore({
          assessmentId: assessment.id,
          assignedScore: assessment.assignedScore
        })
      })
      await Promise.all(promises)

      fireSwalSuccess('Your work has been submitted!')
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      const numberOfAssessmentCompleted = assessments.filter(assessment => assessment.assignedScore).length

      if (numberOfAssessmentCompleted !== assessments.length) {
        const result = await Swal.fire({
          title: `${numberOfAssessmentCompleted}/${assessments.length} Assessment!`,
          text: `You haven't filled all the assessment! Are you sure you want to continue? You can still submit and continue later.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Yes, submit and continue later`,
          cancelButtonText: `Cancel`,
        })

        if (result.isConfirmed) {
          await submit()
        }
        return
      }
      await submit()
    }
  }

  useEffect(async () => {
    try {
      const data = await fetchSelfAssessment(type)
      setAssessments(data)
    } catch (error) {
      console.log(error)
      fireSwalError(error)
    }
  }, [])

  if (!hasAgreed) {
    if (type === 'TECHNICAL') {
      return (
        <div className='mb-4'>
          <InstructionsTech setHasAgreed={setHasAgreed} />
        </div>
      )
    }
    if (type === 'BEHAVIOURAL') {
      return (
        <div className='mb-4'>
          <InstructionsBehav setHasAgreed={setHasAgreed} />
        </div>
      )
    }
  }

  const buttonText = `Submit ${assessments.filter(assessment => assessment.assignedScore).length}/${assessments.length} Assessments`

  return (
    <>
      <div className='col-10'>

        {
          assessments.map(assessment => AssessmentCard(assessment, handlers, type))
        }
        <div className="d-flex flex-row-reverse">
          <SubmitButton
            text={buttonText}
            onClick={handlers.submit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default SelfAssessment