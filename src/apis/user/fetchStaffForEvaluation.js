import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchStaffForEvaluation = async (cfiTypeAssessmentId) => {
  const response = await axios.get(`${config.baseUrl}/cfi/assessment/staff-evaluation?cfiTypeAssessmentId=${cfiTypeAssessmentId}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response.data
}