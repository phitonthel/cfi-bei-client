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
import { fetchCfiAssessments } from '../../../apis/assessment/fetchSelf'
import { submitCfiScore } from '../../../apis/assessment/submitScore';
import { fireSwalSuccess, fireSwalError } from '../../../apis/fireSwal';
import { AssessmentCard } from '../../../components/Cfi/AssessmentCardV2'
import { FloatingMessage } from '../../../components/FloatingMessage'
import { SubmitButton } from '../../../components/SubmitButton';
import { track } from '../../../apis/track';
import { UserBanner } from "./components/UserBanner"
import { mergeCfiToCfi } from 'utils/importAssessments';
import { LoadingSpinner } from 'components/LoadingSpinner';

// type = "TECHNICAL" | "BEHAVIOURAL"
// assessments: {
//   id: string,
//   reviewerAssessments: {
//     id: string,
//     score: number | null,
//     justification: string | null
//     competencyRole: {..., Competency: {...}}
//     ...
//   },
//   revieweeAssessments: {...}
//   errorMessage: string | null
// }
// cfiAssessment: {
//     "type": "TECHNICAL",
//     "isSelfReview"
//     "revieweeId"
//     "reviewerId"
//     "revieweeFullname":
//     "reviewerFullname"
// }
const CfiAssessment = (type) => {
  const [assessments, setAssessments] = useState([])
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      if (filledJustificationAssessment.score === null) {
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
      const assessmentPayload = assessments.map(assessment => {
        const reviewerAssessment = assessment.reviewerAssessment
        return {
          id: reviewerAssessment.id,
          score: reviewerAssessment.score,
          justification: reviewerAssessment.justification
        }
      })
      await submitCfiScore(assessmentPayload)

      removeFromLocalStorage()
      fireSwalSuccess('Your work has been submitted!')
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const localStorageKey = `cfi-assessment:${type}:${cfiTypeAssessment.id}:${cfiAssessment.revieweeId}:${cfiAssessment.reviewerId}`
  const setToLocalStorage = () => {
    const value = JSON.stringify(assessments)
    localStorage.setItem(localStorageKey, value)
  }

  const getFromLocalStorage = () => {
    const value = localStorage.getItem(localStorageKey)
    return JSON.parse(value)
  }

  const removeFromLocalStorage = () => {
    localStorage.removeItem(localStorageKey)
  }

  const isLocalStorageAvailable = () => {
    return !!localStorage.getItem(localStorageKey)
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
      track({
        event: 'click',
        target: 'cfi-assessment',
        action: 'button',
        data: {
          assessmentId: assessmentId,
          score: score
        }
      })
      setAssessments([...assessments])
      setToLocalStorage();
    },
    justification: (assessmentId, newValue) => {
      assessments.forEach(assessment => {
        if (assessment.id === assessmentId) {
          assessment.reviewerAssessment.justification = newValue;
        }
      });
      setAssessments([...assessments])
      setToLocalStorage();
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
        history.push('/hr/cfi-route-selections');
      } else {
        history.push('/hr/cfi/staff-evaluation');
      }
    }
  }

  const handleImportFromPrevious = async ({ selectedItem }) => {
    try {
      setIsLoading(true);
      // Prefer id from the selection if BE provides it:
      const sourceCfiTypeAssessmentId =
        selectedItem?.cfiTypeAssessmentId ?? cfiTypeAssessment.id;

      // 1) Fetch the "from" assessments (the chosen previous CFI)
      const fromCfiAssessments = await fetchCfiAssessments({
        type: type,
        cfiTypeAssessmentId: sourceCfiTypeAssessmentId,
        revieweeId: cfiAssessment.revieweeId,
        reviewerId: cfiAssessment.reviewerId,
      });

      // 2) Merge into current "to" assessments (copy score & justification)
      const merged = mergeCfiToCfi(fromCfiAssessments, assessments);

      // 3) Persist & update UI
      setAssessments(merged);

      fireSwalSuccess({ text: 'Imported answers applied.' });
    } catch (error) {
      fireSwalError(error);
    } finally {
      setToLocalStorage();
      setIsLoading(false);
    }
  };

  const init = async () => {
    try {
      setIsLoading(true)
      let data = null
      if (isLocalStorageAvailable()) {
        data = getFromLocalStorage()
      } else {
        data = await fetchCfiAssessments({
          type: type,
          cfiTypeAssessmentId: cfiTypeAssessment.id,
          revieweeId: cfiAssessment.revieweeId,
          reviewerId: cfiAssessment.reviewerId
        })
      }

      setAssessments(data)
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(async () => {
    init()
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

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <div className='col-10'>
        <FloatingMessage
          title={`Progress`}
          text={`${assessmentsPercentage} Assessment`}
          secondaryText={isLocalStorageAvailable() ? 'You have unsaved changes!' : null}
          onDiscard={() => {
            removeFromLocalStorage()
            init()
          }}
        />

        <UserBanner
          cfiTypeAssessmentId={cfiTypeAssessment.id}
          reviewerId={cfiAssessment.reviewerId}
          revieweeId={cfiAssessment.revieweeId}
          revieweeFullname={cfiAssessment.revieweeFullname}
          onImportSelected={handleImportFromPrevious}
        />

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