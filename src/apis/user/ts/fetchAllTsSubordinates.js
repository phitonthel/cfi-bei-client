import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../../env';

export const fetchAllTsSubordinates = async () => {
  const response = await axios.get(`${config.baseUrl}/ts-nomination/subordinates`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}