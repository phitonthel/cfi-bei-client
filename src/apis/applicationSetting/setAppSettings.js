import axios from 'axios';

import { config } from '../../env';

export const setAppSettings = async ({
  appSettings,
}) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/application-settings/list`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      appSettings,
    }
  });
  return response
}