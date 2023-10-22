import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const login = async ({ nik, password }) => {
  const response = await axios.post(`${config.baseUrl}/user/login`, {
    nik,
    password
  })

  const {
    access_token,
    fullname,
    level,
  } = response.data

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('level', level);

  Swal.fire({
    position: 'top',
    icon: 'success',
    text: `Welcome, ${fullname}`,
    showConfirmButton: false,
    timer: 1000
  })

  return response.data
}

export const logout = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("fullname");
  localStorage.removeItem("level");

  Swal.fire({
    position: 'top',
    icon: 'success',
    text: `Logged out!`,
    showConfirmButton: false,
    timer: 1000
  })
}