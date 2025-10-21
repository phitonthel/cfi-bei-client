import axios from 'axios';
import { config } from '../../env';

export const updateUserMe = async ({
  email,
  oldPassword,
  newPassword,
}) => {
  const response = await axios({
    method: 'PATCH',
    url: `${config.baseUrl}/users/me`,
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
    data: {
      email,
      oldPassword,
      newPassword,
    },
  });
  return response;
};

export const updateUserByAdmin = async ({
  userId,
  email,
  division,
  unit,
  positionName,
  isMfaEnabled,
}) => {
  const response = await axios({
    method: 'PATCH',
    url: `${config.baseUrl}/admin/users/${userId}`,
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
    data: {
      email,
      division,
      unit,
      positionName,
      isMfaEnabled,
    },
  });
  return response;
}