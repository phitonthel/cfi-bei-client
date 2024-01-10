import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

// top strengths and weaknesses
export const fetchCfiSummaryReport = async () => {
  const { data } = await axios.get(`${config.baseUrl}/cfi/report/summary-strengh-weakness`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}