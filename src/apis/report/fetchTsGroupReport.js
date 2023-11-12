import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchTsGroupReport = async () => {
  const { data } = await axios.get(`${config.baseUrl}/ts-assessment/report/group`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}