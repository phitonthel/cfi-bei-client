import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchUsersForSuperadmin = async () => {
  const response = await axios.get(`${config.baseUrl}/user/list-superadmin`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response.data.map(user => {
    return {
      nik: user.nik,
      fullname: user.fullname,
      email: user.email,
      division: user.Division?.name,
      unit: user.unit,
      positionName: user.positionName,
      cfiRole: user.role,
      password: user.password,
    }
  })
}