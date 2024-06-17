import axios from 'axios';

import { config } from '../../env';

export const fetchCfiTypeAssessments = async () => {
  const response = await axios.get(`${config.baseUrl}/cfi/types`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response.data
};

export const fetchCfiDetailedTypeAssessments = async ({ queryKey }) => {
  const [_key, { userId, cfiTypeAssessmentId }] = queryKey;

  const response = await axios.get(`${config.baseUrl}/cfi/types-detailed`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      userId,
      cfiTypeAssessmentId
    }
  });

  return response.data;
};