import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchSelfAssessment = async () => {
  const { data } = await axios.get(`${config.baseUrl}/assessment/self`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return data.map(assessment => {
    return {
      id: assessment.id,
      assignedScore: assessment.assignedScore,
      reviewerScore: assessment.reviewerScore,
      expectedScore: assessment.CompetencyRole.expectedScore,
      category: assessment.CompetencyRole?.Competency?.category,
      title: assessment.CompetencyRole?.Competency?.title,
      description: assessment.CompetencyRole?.Competency?.description,
      options: assessment.CompetencyRole?.Competency?.options,
      shouldShowCriterias: false
    }
  })
}

// export const submitSelfAssessment = async (payload) => {
//   const promises = payload.map(e => {
//     return axios({
//       method: 'POST',
//       url: `${config.baseUrl}/assessment/assigned`,
//       headers: {
//         access_token: localStorage.getItem('access_token')
//       },
//       data: {
//         assessmentId: e.assessmentId,
//         assignedScore: e.assignedScore,
//       }
//     });
//   })

//   await Promise.all(promises)
// }