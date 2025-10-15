import axios from 'axios';

import { config } from '../../env';

export const fetchCfiNominationsForAdmin = async ({ queryKey }) => {
  const [_key, { cfiTypeAssessmentId }] = queryKey;

  const response = await axios.get(`${config.baseUrl}/cfi/nominations`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      cfiTypeAssessmentId
    }
  });

  return response.data;
};

export const createCfiNominationAndAssessments = async ({ cfiTypeAssessmentId, revieweeId, reviewerId, cfiRole }) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/cfi/nomination/assessments/user-id`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      cfiTypeAssessmentId,
      revieweeId,
      reviewerId,
      cfiRole
    }
  });

  return response.data;
};

export const deleteCfiNominationById = async (nominationId) => {
  const response = await axios({
    method: 'DELETE',
    url: `${config.baseUrl}/cfi/nomination`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      id: nominationId
    }
  });

  return response.data;
};