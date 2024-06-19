import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

// userId, cfiTypeAssessmentId
export const fetchCfiIndividualReport = async (query) => {
  const stringifiedQuery = new URLSearchParams(query).toString();
  const { data } = await axios.get(`${config.baseUrl}/cfi/report/individual?${stringifiedQuery}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}