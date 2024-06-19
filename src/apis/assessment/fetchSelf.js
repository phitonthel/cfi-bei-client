import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchSelfAssessmentDeprecated = async (type) => {
  const query = `?type=${type}`
  
  const { data } = await axios.get(`${config.baseUrl}/assessment/self${query}`, {
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

export const fetchSelfAssessment = async (queryParams) => {
  console.log('queryParams', queryParams)
  const query = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
  
  const { data } = await axios.get(`${config.baseUrl}/cfi/assessment/user?${query}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  console.log('xxx', data)

  return data

  // return data.map(assessment => {
  //   return {
  //     id: assessment.id,
  //     assignedScore: assessment.assignedScore,
  //     reviewerScore: assessment.reviewerScore,
  //     expectedScore: assessment.CompetencyRole.expectedScore,
  //     category: assessment.CompetencyRole?.Competency?.category,
  //     title: assessment.CompetencyRole?.Competency?.title,
  //     description: assessment.CompetencyRole?.Competency?.description,
  //     options: assessment.CompetencyRole?.Competency?.options,
  //     shouldShowCriterias: false
  //   }
  // })
}