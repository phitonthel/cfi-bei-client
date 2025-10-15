import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

// payload is an array with keys: id, score, justification
export const submitCfiScore = async (payload) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/cfi/assessment/score`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      payload
    }
  });
  return response
}

export const submitTsScore = async ({
  tsAssessmentId,
  score,
  justification,
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
      justification,
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