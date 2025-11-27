import axios from 'axios';

import { config } from '../../env';

export const setAutoNomination = async ({
  revieweeId,
  reviewerId,
  isAutoNominated,
}) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/ts-nomination/auto-nomination`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      reviewerId,
      revieweeId,
      isAutoNominated,
    }
  });
  return response;
};
