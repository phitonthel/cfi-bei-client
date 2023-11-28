import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../../env';

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${config.baseUrl}/user/edit`, 
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        userId, // Include userId in the request body
        nik: userData.nik,
        fullname: userData.fullname,
        level: userData.level,
        directorate: userData.directorate,
        divisionName: userData.divisionName,
        unitName: userData.unitName,
        location: userData.location,
        roleName: userData.roleName,
        positionName: userData.positionName,
      }
    });

    return response;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
