import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const nominatePeer = async ({
  revieweeId,
  reviewerId,
}) => {
  const response = await axios({
    method: 'POST',
    url: `${config.baseUrl}/ts-nomination/nominate`,
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