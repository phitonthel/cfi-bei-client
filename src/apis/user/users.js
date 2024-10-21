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
      password: user.password,
      level: user.level,
      directorate: user.directorate,
      division: user.division,
      unit: user.unit,
      location: user.location,
      positionName: user.positionName,
      role: user.role,
      isActive: 'Yes'
    }
  })
}