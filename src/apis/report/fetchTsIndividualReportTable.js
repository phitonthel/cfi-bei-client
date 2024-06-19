import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

// fetch subordinates
export const fetchTsIndividualReportTable = async () => {
  const { data } = await axios.get(`${config.baseUrl}/ts-assessment/report/individual-table`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}