import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchSubordinates = async () => {
  const response = await axios.get(`${config.baseUrl}/user/list-subordinate`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}