import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchFeedbackForm = async ({
  reviewerId,
  revieweeId,
}) => {
  const query = `?reviewerId=${reviewerId}&revieweeId=${revieweeId}`

  const { data } = await axios.get(`${config.baseUrl}/ts-assessment/feedback-form${query}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return data
}