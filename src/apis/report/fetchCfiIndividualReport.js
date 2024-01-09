import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchCfiIndividualReport = async (userId) => {
  const query = `?userId=${userId}`

  const { data } = await axios.get(`${config.baseUrl}/cfi/report/individual${query}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}