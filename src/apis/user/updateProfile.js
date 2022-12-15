import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const updateProfile = async ({
  username,
  email,
}) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${config.baseUrl}/user/update-profile`,
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        username,
        email,
      }
    });
    return response
  } catch (error) {
    Swal.fire({
      position: 'top',
      icon: 'error',
      text: error.response?.data?.message || error.message,
      showConfirmButton: false,
      timer: 1000
    })
  }
}