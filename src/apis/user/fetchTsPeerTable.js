import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchTsPeerTable = async () => {
  const response = await axios.get(`${config.baseUrl}/ts-nomination/peer-table`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}