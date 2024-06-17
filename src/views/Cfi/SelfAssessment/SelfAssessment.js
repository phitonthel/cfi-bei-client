import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Card, Badge, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { fetchSelfAssessment, submitSelfAssessment } from '../../../apis/assessment/fetchSelf'
import { AssessmentCard } from '../../../components/Cfi/AssessmentCardV2'
import { InstructionsTech } from './InstructionsTech'
import { InstructionsBehav } from './InstructionsBehav'
import { fireSwalSuccess, fireSwalError } from '../../../apis/fireSwal';
import { submitScore } from '../../../apis/assessment/submitScore';
import { SubmitButton } from '../../../components/SubmitButton';
import { FloatingMessage } from '../../../components/FloatingMessage'

const SelfAssessment = (type) => {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const authUser = useSelector(state => state.auth.user);
  const cfiTypeAssessment = useSelector(state => state.app.utilities.cfiTypeAssessment);
  const cfiAssessment = useSelector(state => state.app.utilities.cfiAssessment);

  const submit = async () => {
    try {
      setIsSubmitting(true)
      const assessmentPayload = assessments.map(assessment => {
        const cfiReview = assessment.cfiReviews.find(review => review.reviewerId === authUser.id)
        return {
          id: cfiReview.id,
          score: cfiReview.score,
          justification: cfiReview.justification
        }
      })
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
          assessment.cfiReviews.forEach(review => {
            if (review.reviewerId === authUser.id) {
              review.score = score;
            }
          });
        }
      });
      setAssessments([...assessments])
    },
    justification: (assessmentId, newValue) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.cfiReviews.forEach(review => {
            if (review.reviewerId === authUser.id) {
              review.justification = newValue;
            }
          });
        }
      });
      setAssessments([...assessments])
    },
    // send request to server
    submitConfirmation: async () => {
      const flattenedCfiReviews = assessments.map(assessment => assessment.cfiReviews).flatMap(review => review)
      const correspondingReviews = flattenedCfiReviews.filter(review => review.reviewerId === authUser.id)
      const completedCorrespondingReviews = correspondingReviews.filter(review => review.score !== null)

      if (completedCorrespondingReviews.length !== correspondingReviews.length) {
        const result = await Swal.fire({
          title: `${completedCorrespondingReviews.length}/${correspondingReviews.length} Assessment!`,
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
      const data = await fetchSelfAssessment({
        type,
        cfiTypeAssessmentId: cfiTypeAssessment.id,
        userId: cfiAssessment.userId,
      })
      setAssessments(data)
    } catch (error) {
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

  const flattenedCfiReviews = assessments.map(assessment => assessment.cfiReviews).flatMap(review => review)
  const correspondingReviews = flattenedCfiReviews.filter(review => review.reviewerId === authUser.id)
  const completedCorrespondingReviews = correspondingReviews.filter(review => review.score !== null)
  const assessmentsPercentage = `${completedCorrespondingReviews.length}/${correspondingReviews.length}`
  const buttonText = `Submit ${assessmentsPercentage} Assessments`

  return (
    <>
      <div className='col-10'>
        <FloatingMessage
          title={`Progress`}
          text={`${assessmentsPercentage} Assessment`}
        />
        <Card className="mb-3">
          <Card.Body className="d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
            <Card.Title as="h4" className="mb-0">{cfiAssessment.userFullname}</Card.Title>
          </Card.Body>
        </Card>
        {
          assessments.map(assessment =>
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              handlers={handlers}
              type={type}
              isSelfReview={cfiAssessment.isSelfReview}
            />)
        }
        <div className="d-flex flex-row-reverse">
          <SubmitButton
            text={buttonText}
            onClick={handlers.submitConfirmation}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default SelfAssessment