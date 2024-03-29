import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const approveAllNomination = async () => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/ts-nomination/approve-all`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
  });
  return response;
};
