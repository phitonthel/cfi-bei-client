import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../../env';

export const addUser = async (userData) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.baseUrl}/user/create`, 
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        nik: userData.nik,
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password,
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
    // Handle the error accordingly
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
