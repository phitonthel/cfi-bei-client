import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchById = async ({
  assignedId,
}) => {
  const response = await axios({
    method: 'GET',
    url: `${config.baseUrl}/assessment/detail?assignedId=${assignedId}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
  });
  return response
}