import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const fetchFeedbackForm = async ({
  reviewerId,
  revieweeId,
}) => {
  const query = `?reviewerId=${reviewerId}&revieweeId=${revieweeId}`

  const response = await axios.get(`${config.baseUrl}/ts-assessment/feedback-form${query}`, {
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })

  return response

  return response.data.map(assessment => {
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