import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';


import { fetchSelfAssessment, submitSelfAssessment } from '../../apis/assessment/fetchSelf'
import { fetchFeedbackForm } from '../../apis/tsAssessment/fetchFeedbackForm';

import { AssessmentCard } from '../../components/Assessment360/Card'
import { Instructions } from './Instructions'
import { fireSwalSuccess, fireSwalError } from '../../apis/fireSwal';
import { submitTsScore, submitTsEssay } from '../../apis/assessment/submitScore';
import { SubmitButton } from '../../components/SubmitButton';
import OpenFeedbackForm from './OpenFeedbackForm';
import { fetchById } from '../../apis/assessment/fetchById';
import { FloatingMessage } from '../../components/FloatingMessage';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

const calculateAssessmentPercentage = ({
  tsAssessments,
  tsEssayAssessments,
}) => {
  const numberOfAssessmentCompleted = tsAssessments.filter(tsA => tsA.score !== null).length
  const numberOfTsEssayAssessmentCompleted = Object.values(tsEssayAssessments).filter((tsAF => tsAF.feedback !== '')).length

  const totalAssessmentCompleted = numberOfAssessmentCompleted + numberOfTsEssayAssessmentCompleted
  const totalAssessment = tsAssessments.length + 9

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

  const { assessmentPercentage } = calculateAssessmentPercentage({
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
      console.log(response.data);

      const revieweeId = localStorage.getItem('360_reviewee_id')
      const { data } = await fetchById({ assignedId: revieweeId })
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

  const buttonText = `Submit ${assessmentPercentage} Assessments`

  return (
    <>
      <div className='col-10'>
        <div className="mb-4">
          <h2 style={{ margin: 0 }}>{peerName}</h2>
        </div><hr></hr>

        <FloatingMessage
          title={`Progress`}
          text={`${assessmentPercentage} Assessment`}
        />

        <QuestionForm
          initialQuestions={tsAssessments}
          setTsAssessments={setTsAssessments}
        />

        {/* {
          assessments.map((assessment, idx) => AssessmentCard(idx, assessment, handlers, '360'))
        } */}

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