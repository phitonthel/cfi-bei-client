import { config } from '../env'

const SET_USER = "user/set"

export function setUser(payload) {
  return {
    type: SET_USER,
    payload: payload,
  };
}

export function editUser(payload) {
  return () => {
    return new Promise((resolve, reject) => {
      fetch(`${config.baseUrl}/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      })
        .then((result) => {
          if (result.ok) {
            resolve(result.json());
          }
          return result.json();
        })
        .then((result) => {
          reject(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}