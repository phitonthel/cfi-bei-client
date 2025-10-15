import axios from 'axios';
import { config } from '../../env';

export const getPreviousCfiTypeAssessments = async ({ revieweeId, cfiTypeAssessmentId }) => {
  const response = await axios.get(`${config.baseUrl}/cfi/import/cfi-type-assessment`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: { revieweeId, cfiTypeAssessmentId }
  });
  return response.data;
};
