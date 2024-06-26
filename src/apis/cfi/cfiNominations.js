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