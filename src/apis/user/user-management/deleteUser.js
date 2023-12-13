import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../../env';

export const deleteUser = async (id) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${config.baseUrl}/user/${id}`, // Include the ID in the URL
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    });

    // Handle the response accordingly
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'User has been deleted.',
    });

    return response;
  } catch (error) {
    // Handle the error accordingly
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
