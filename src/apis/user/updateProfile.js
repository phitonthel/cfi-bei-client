import axios from 'axios';
import { config } from '../../env';

export const updateProfile = async ({
  email,
  oldPassword,
  newPassword,
  isMfaEnabled,   // ⬅️ include MFA flag
}) => {
  const response = await axios({
    method: 'PUT',
    url: `${config.baseUrl}/user/update-profile`,
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
    data: {
      email,
      oldPassword,
      newPassword,
      isMfaEnabled, // ⬅️ send to BE
    },
  });
  return response;
};
