import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../env';

export const track = async (payload) => {
  await axios({
    method: 'POST',
    url: `${config.baseUrl}/track`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: payload
  });
}