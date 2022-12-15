import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchSelfDetail = async () => {
  const { data } = await axios.get(`${config.baseUrl}/user/self-detail`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return data
}