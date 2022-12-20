import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

/**
 * Can be used to submit reviewerScore or assignedScore
 */
export const submitScore = async ({
  assessmentId,
  assignedScore,
  reviewerScore,
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/assessment/score`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      assessmentId,
      assignedScore,
      reviewerScore,
    }
  });
  return response
}