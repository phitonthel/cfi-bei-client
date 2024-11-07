import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

// userId, cfiTypeAssessmentId
export const fetchTsInstructions = async (query) => {
  const stringifiedQuery = new URLSearchParams(query).toString();
  const { data } = await axios.get(`${config.baseUrl}/ts-nomination/instructions?${stringifiedQuery}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  
  return data
}