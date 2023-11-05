import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const nominateUserBySuperadmin = async ({
  revieweeId,
  reviewerId,
}) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/ts-nomination/nominate-by-superadmin`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      reviewerId,
      revieweeId,
    }
  });
  return response
}