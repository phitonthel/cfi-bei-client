import axios from 'axios';

import { config } from '../../env';

export const fetchAppSettings = async () => {
  const response = await axios.get(`${config.baseUrl}/application-settings/list`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}