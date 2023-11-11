import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchTsIndividualReport = async (revieweeId) => {
  const query = `?revieweeId=${revieweeId}`

  const { data } = await axios.get(`${config.baseUrl}/ts-assessment/report/individual${query}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}