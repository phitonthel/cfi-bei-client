import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../../env';

export const persistAuth = ({ access_token, fullname, level }) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('level', level);
}

export const login = async ({ nik, password }) => {
  const { data } = await axios.post(`${config.baseUrl}/user/login`, { nik, password });

  return data; // { access_token, fullname, level, mfaRequired, challengeId, delivery, expiresAt }

  // // If MFA is required, DO NOT persist anything yet — let the caller show OTP UI
  // if (data?.mfaRequired) {
  //   return data; // { mfaRequired, challengeId, delivery, expiresAt }
  // }

  // // Normal (no MFA) flow — persist & greet
  // const { access_token, fullname, level } = data;
  // persistAuth({ access_token, fullname, level });

  // Swal.fire({
  //   position: 'top',
  //   icon: 'success',
  //   text: `Welcome, ${fullname}`,
  //   showConfirmButton: false,
  //   timer: 1000
  // });

  // return data;
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('fullname');
  localStorage.removeItem('level');
  localStorage.removeItem('reduxState');

  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'Logged out!',
    showConfirmButton: false,
    timer: 1000
  });
};
