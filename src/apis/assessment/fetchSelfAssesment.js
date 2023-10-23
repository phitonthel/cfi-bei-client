import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchSelfAssessment = async () => {
  try {
    const { data } = await axios.get(`${config.baseUrl}/report-individual`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    });

    return data;
  } catch (error) {
    console.error('Error fetching self assessment:', error);
  }
};
