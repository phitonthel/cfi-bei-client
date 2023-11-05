import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const unapproveNomination = async ({
  revieweeId,
  reviewerId,
}) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/ts-nomination/unapprove`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      reviewerId,
      revieweeId,
    }
  });
  return response;
};
