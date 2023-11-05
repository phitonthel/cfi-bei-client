import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchFeedbackFormUsers = async () => {
  const response = await axios.get(`${config.baseUrl}/ts-assessment/feedback-form-table`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}