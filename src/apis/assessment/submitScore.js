import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

/**
 * Can be used to submit reviewerScore or assignedScore
 */
export const submitScore = async ({
  assessmentId,
  assignedScore,
  reviewerScore,
  reviewerId,
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/assessment/score`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      assessmentId,
      assignedScore,
      reviewerScore,
      reviewerId,
    }
  });
  return response
}

export const submitTsScore = async ({
  tsAssessmentId,
  score,
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/ts-assessment/score`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      tsAssessmentId,
      score,
    }
  });
  return response
}

export const submitTsEssay = async ({
  tsEssayAssessmentId,
  feedback,
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/ts-essay-assessment/feedback`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      tsEssayAssessmentId,
      feedback,
    }
  });
  return response
}