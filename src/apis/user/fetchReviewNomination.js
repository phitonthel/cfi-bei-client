import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchReviewNomination = async (isGetFeedbackCompletion) => {
  const path = isGetFeedbackCompletion ? '/ts-nomination/review-nominations-table?options=getFeedbackCompletion' : '/ts-nomination/review-nominations-table'

  const response = await axios.get(`${config.baseUrl}${path}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response
}