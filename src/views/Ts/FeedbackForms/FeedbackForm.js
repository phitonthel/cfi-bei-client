import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';


import { fetchFeedbackForm } from '../../../apis/tsAssessment/fetchFeedbackForm';

import { Instructions } from './Instructions'
import { fireSwalSuccess, fireSwalError } from '../../../apis/fireSwal';
import { submitTsScore, submitTsEssay } from '../../../apis/assessment/submitScore';
import { SubmitButton } from '../../../components/SubmitButton';
import OpenFeedbackForm from './OpenFeedbackForm';
import { fetchById } from '../../../apis/assessment/fetchById';
import { FloatingMessage } from '../../../components/FloatingMessage';
import QuestionForm from '../../../components/QuestionForm/QuestionForm';
import ScoringLegend from './ScoringLegend';
import BaseInstructions from '../BaseInstructions';

const calculateAssessmentPercentage = ({
  tsAssessments,
  tsEssayAssessments,
}) => {
  const numberOfAssessmentCompleted = tsAssessments.filter(tsA => tsA.score !== null).length
  const numberOfTsEssayAssessmentCompleted = Object.values(tsEssayAssessments).filter((tsAF => tsAF.feedback !== '')).length

  const totalAssessmentCompleted = numberOfAssessmentCompleted + numberOfTsEssayAssessmentCompleted
  const totalAssessment = tsAssessments.length + 3

  return {
    assessmentPercentage: `${totalAssessmentCompleted}/${totalAssessment}`,
    totalAssessmentCompleted,
    totalAssessment,
  }
}


const FeedbackForm = () => {
  const authUser = useSelector(state => state.auth.user);

  const [tsAssessments, setTsAssessments] = useState([])
  const [tsEssayAssessments, setTsEssayAssessments] = useState([])

  const [peerName, setPeerName] = useState('')
  const [hasAgreed, setHasAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    assessmentPercentage,
    totalAssessmentCompleted,
    totalAssessment,
  } = calculateAssessmentPercentage({
    tsAssessments,
    tsEssayAssessments,
  })

  const submit = async () => {
    try {
      setIsSubmitting(true)

      const tsAssessmentPromises = tsAssessments.map(tsA => {
        return submitTsScore({
          tsAssessmentId: tsA.id,
          score: tsA.score
        })
      })

      const tsEssayAssessmentsPromises = tsEssayAssessments.map(tsEA => {
        return submitTsEssay({
          tsEssayAssessmentId: tsEA.id,
          feedback: tsEA.feedback,
        })
      })

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
          await Promise.all([
            ...tsAssessmentPromises,
            ...tsEssayAssessmentsPromises,
          ])

          fireSwalSuccess('Your work has been submitted!')
        }
        return
      }

      await Promise.all([
        ...tsAssessmentPromises,
        ...tsEssayAssessmentsPromises,
      ])

      fireSwalSuccess('Your work has been submitted!')
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(async () => {
    try {
      const response = await fetchFeedbackForm({
        reviewerId: authUser.id,
        revieweeId: localStorage.getItem('360_reviewee_id'),
      })

      setTsAssessments(response.data.tsAssessments)
      setTsEssayAssessments(response.data.tsEssayAssessments)

      const revieweeName = localStorage.getItem('360_reviewee_fullname')
      setPeerName(revieweeName)

    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  if (!hasAgreed) {
    return (
      <div className='mb-4'>
        {/* <Instructions setHasAgreed={setHasAgreed} /> */}
      </div>
    )
  }

  const buttonText = `Submit ${assessmentPercentage} Assessments`

  return (
    <>
      <div className='col-10'>
        <div className="mb-4">
          <h2 style={{ margin: 0 }}>{peerName}</h2>
        </div><hr></hr>

        < ScoringLegend />

        <FloatingMessage
          title={`Progress`}
          text={`${assessmentPercentage} Assessment`}
        />

        <QuestionForm
          initialQuestions={tsAssessments}
          setTsAssessments={setTsAssessments}
        />

        <OpenFeedbackForm
          initialTsEssayAssessments={tsEssayAssessments}
          setTsEssayAssessments={setTsEssayAssessments}
        />

        <div className="d-flex flex-row-reverse">
          <SubmitButton
            text={buttonText}
            onClick={submit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackForm