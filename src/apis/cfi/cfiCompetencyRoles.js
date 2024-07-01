import axios from 'axios';

import { config } from '../../env';

export const fetchCfiCompetencyRoles = async (type) => {
  const response = await axios.get(`${config.baseUrl}/cfi/competency-roles`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      type
    }
  });

  return response;
};