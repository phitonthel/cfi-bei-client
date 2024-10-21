import React, { useState, useEffect } from 'react';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Card, Badge, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { InstructionsBehav } from './InstructionsBehav'
import { InstructionsTech } from './InstructionsTech'
import { fetchSelfAssessment } from '../../../apis/assessment/fetchSelf'
import { submitScore } from '../../../apis/assessment/submitScore';
import { fireSwalSuccess, fireSwalError } from '../../../apis/fireSwal';
import { AssessmentCard } from '../../../components/Cfi/AssessmentCardV2'
import { FloatingMessage } from '../../../components/FloatingMessage'
import { SubmitButton } from '../../../components/SubmitButton';

const CfiAssessment = (type) => {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const authUser = useSelector(state => state.auth.user);
  const cfiTypeAssessment = useSelector(state => state.app.utilities.cfiTypeAssessment);
  const cfiAssessment = useSelector(state => state.app.utilities.cfiAssessment);

  const history = useHistory()

  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetErrorMessage = () => {
    assessments.forEach(assessment => {
      assessment.errorMessage = null
    });
    setAssessments([...assessments])
  }


  const isSubmissionValid = () => {
    const reviewerAssessments = assessments.map(assessment => {
      return {
        parentId: assessment.id,
        ...assessment.reviewerAssessment
      }
    })

    const filledScoreAssessments = reviewerAssessments.filter(review => review.score !== null)
    for (const filledScoreAssessment of filledScoreAssessments) {
      if (!filledScoreAssessment.justification) {
        handleScroll(filledScoreAssessment.parentId)

        assessments.forEach(assessment => {
          if (assessment.id === filledScoreAssessment.parentId) {
            assessment.errorMessage = "Both score and justification are required!";
          }
        });
        setAssessments([...assessments])

        return false
      }
    }

    const filledJustificationAssessments = reviewerAssessments.filter(review => !!review.justification)
    for (const filledJustificationAssessment of filledJustificationAssessments) {
      if (!filledJustificationAssessment.score) {
        handleScroll(filledJustificationAssessment.parentId)

        assessments.forEach(assessment => {
          if (assessment.id === filledJustificationAssessment.parentId) {
            assessment.errorMessage = "Both score and justification are required!";
          }
        });
        setAssessments([...assessments])

        return false
      }
    }

    return true
  }

  const awaitConfirmation = async () => {
    const reviewerAssessments = assessments.map(assessment => assessment.reviewerAssessment)
    const completedReviewerAssessments = reviewerAssessments.filter(review => review.score !== null)

    if (completedReviewerAssessments.length !== reviewerAssessments.length) {
      const result = await Swal.fire({
        title: `${completedReviewerAssessments.length}/${reviewerAssessments.length} Assessment!`,
        text: `You haven't filled all the assessment! Are you sure you want to continue? You can still submit and continue later.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, submit and continue later`,
        cancelButtonText: `Cancel`,
      })

      if (!result.isConfirmed) {
        return false
      }
    }

    return true
  }

  const submit = async () => {
    try {
      setIsSubmitting(true)
      const assessmentPromises = assessments.map(assessment => {
        const reviewerAssessment = assessment.reviewerAssessment
        return submitScore({
          id: reviewerAssessment.id,
          score: reviewerAssessment.score,
          justification: reviewerAssessment.justification
        })
      })
      await Promise.all(assessmentPromises)

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
          assessment.reviewerAssessment.score = score;
        }
      });
      setAssessments([...assessments])
    },
    justification: (assessmentId, newValue) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.reviewerAssessment.justification = newValue;
        }
      });
      setAssessments([...assessments])
    },
    // send request to server
    submitConfirmation: async () => {
      resetErrorMessage()

      if (!isSubmissionValid()) {
        return
      }

      const isSubmit = await awaitConfirmation()
      if (!isSubmit) {
        return
      }

      await submit()

      if (cfiAssessment.isSelfReview) {
        history.push('/admin/cfi-route-selections');
      } else {
        history.push('/admin/cfi/staff-evaluation');
      }
    }
  }

  useEffect(async () => {
    try {
      const data = await fetchSelfAssessment({
        type,
        cfiTypeAssessmentId: cfiTypeAssessment.id,
        revieweeId: cfiAssessment.revieweeId,
        reviewerId: cfiAssessment.reviewerId,
      })

      setAssessments(data.map(e => {
        return {
          ...e,
          errorMessage: null
        }
      }))
    } catch (error) {
      fireSwalError(error)
    }
  }, [])

  if (!hasAgreed && cfiAssessment.isSelfReview) {
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

  const flattenedCfiReviews = assessments.map(assessment => assessment.reviewerAssessment)
  const completedCorrespondingReviews = flattenedCfiReviews.filter(review => review.score !== null)
  const assessmentsPercentage = `${completedCorrespondingReviews.length}/${flattenedCfiReviews.length}`
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
            <Card.Title as="h4" className="mb-0">{cfiAssessment.revieweeFullname}</Card.Title>
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

export default CfiAssessment