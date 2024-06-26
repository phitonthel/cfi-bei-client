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

export const createCfiTypeAssessment = async ({ name, competencyRoleType }) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/cfi/type`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      name,
      competencyRoleType
    }
  });

  return response.data;
};

export const updateCfiTypeAssessment = async ({ id, config: cfiTypeAssessmentConfig }) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/cfi/type`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      id,
      config: cfiTypeAssessmentConfig
    }
  });

  return response.data;
};