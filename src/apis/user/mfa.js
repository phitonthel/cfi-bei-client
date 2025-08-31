import axios from "axios";

import { config } from '../../env';

export async function verifyMfa({ challengeId, code }) {
  // const { data } = await axios.post("/user/mfa/verify", { challengeId, code });
  const { data } = await axios.post(`${config.baseUrl}/user/mfa/verify`, { challengeId, code });
  return data; // { access_token, id, fullname, level, isMfaEnabled }
}

export async function resendMfa({ challengeId }) {
  // const { data } = await axios.post("/user/mfa/resend", { challengeId });
  const { data } = await axios.post(`${config.baseUrl}/user/mfa/resend`, { challengeId });
  return data; // { message, expiresAt }
}
