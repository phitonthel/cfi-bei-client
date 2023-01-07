import { renderScore } from '../../components/AssessmentCard'

export const renderDropdown = (propAssessment, setAssessments) => {
  return (
    <select className="form-select" value={propAssessment.reviewerScore ?? undefined}
      onChange={(e) => {
        const reviewerInputScore = e.target.value

        setAssessments((assessments) => {
          assessments.forEach(assessment => {
            if (assessment.id === propAssessment.id) {
              assessment.reviewerScore = reviewerInputScore
            }
          });

          return [...assessments]
        })
      }
      }>
      <option disabled>SELECT SCORE</option>
      <option value={0}>{renderScore(0, propAssessment.type)}</option>
      <option value={1}>{renderScore(1, propAssessment.type)}</option>
      <option value={2}>{renderScore(2, propAssessment.type)}</option>
      <option value={3}>{renderScore(3, propAssessment.type)}</option>
      <option value={4}>{renderScore(4, propAssessment.type)}</option>
    </select >
  )
}