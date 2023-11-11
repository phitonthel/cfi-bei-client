import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../../env';

export const fetchAllTsPeers = async () => {
  const response = await axios.get(`${config.baseUrl}/ts-nomination/peers`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}