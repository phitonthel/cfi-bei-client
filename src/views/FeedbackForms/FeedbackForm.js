import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { fetchSelfAssessment, submitSelfAssessment } from '../../apis/assessment/fetchSelf'

import { AssessmentCard } from '../../components/Assessment360/Card'
import { Instructions } from './Instructions'
import { fireSwalSuccess, fireSwalError } from '../../apis/fireSwal';
import { submitScore } from '../../apis/assessment/submitScore';
import { SubmitButton } from '../../components/SubmitButton';
import OpenFeedbackForm from './OpenFeedbackForm';
import { fetchById } from '../../apis/assessment/fetchById';
import { FloatingMessage } from '../../components/FloatingMessage';

const FeedbackForm = () => {
  const [assessments, setAssessments] = useState([])
  const [openAssessments, setOpenAssessments] = useState([])
  const [peerName, setPeerName] = useState()
  const [hasAgreed, setHasAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const numberOfAssessmentCompleted = assessments.filter(assessment => assessment.assignedScore !== null).length
  const numberOfOpenAssessmentCompleted = Object.values(openAssessments).filter((asm => asm !== '')).length

  const totalAssessmentCompleted = numberOfAssessmentCompleted + numberOfOpenAssessmentCompleted
  const totalAssessment = assessments.length + 3

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
    // send request to server
    submit: async () => {
      if (totalAssessmentCompleted !== totalAssessment) {
        const result = await Swal.fire({
          title: `${totalAssessmentCompleted}/${totalAssessment} Assessment!`,
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
      const assessments = await fetchSelfAssessment('BEHAVIOURAL')
      // const assessments = []
      setAssessments(assessments)

      const assignedId = localStorage.getItem('peer_id')
      const { data } = await fetchById({ assignedId })
      setPeerName(data[0].assigned.fullname)

    } catch (error) {
      console.log(error)
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

  const assessmentsPercentage = `${assessments.filter(assessment => assessment.assignedScore !== null).length}/${assessments.length}`
  const buttonText = `Submit ${assessmentsPercentage} Assessments`

  return (
    <>
      <div className='col-10'>
        <div className="mb-4">
          <h2 style={{ margin: 0 }}>{peerName}</h2>
        </div><hr></hr>

        <FloatingMessage
          title={`Progress`}
          text={`${assessmentsPercentage} Assessment`}
        />

        {
          assessments.map((assessment, idx) => AssessmentCard(idx, assessment, handlers, '360'))
        }
        <OpenFeedbackForm setOpenAssessments={setOpenAssessments} />
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

export default FeedbackForm