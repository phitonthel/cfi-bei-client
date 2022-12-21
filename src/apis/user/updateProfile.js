import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const updateProfile = async ({
  email,
  oldPassword,
  newPassword,
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/user/update-profile`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      email,
      oldPassword,
      newPassword,
    }
  });
  return response
}