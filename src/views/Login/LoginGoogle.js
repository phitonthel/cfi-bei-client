// import React from 'react';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';

// // import GoogleLogin from 'react-google-login';

// function LoginGoogle() {

//   const responseGoogle = async (response) => {
//     try {
//       const { credential } = response
//       const { data } = await axios({
//         method: 'POST',
//         url: 'http://localhost:3001/auth/login/google',
//         data: {
//           credential,
//         }
//       });
//       console.log(data);
//     } catch (error) {
//       console.log({ error });
//     }
//   }

//   return (
//     <>
//       <GoogleLogin
//         onSuccess={credentialResponse => {
//           responseGoogle(credentialResponse)
//         }}
//         onError={() => {
//           console.log('Login Failed');
//         }}
//       />;
//     </>
//   )
// };

// export default LoginGoogle