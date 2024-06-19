import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { approveNomination } from '../../../apis/tsAssessment/approveNomination';
import { unapproveNomination } from '../../../apis/tsAssessment/unapproveNomination';

export const handleApprovalUser = async ({
  reviewer,
  reviewee,
  initNominations,
}) => {
  try {
    await approveNomination({
      revieweeId: reviewee.id,
      reviewerId: reviewer.id,
    })
    fireSwalSuccess({ text: 'User approved successfully!' });
  } catch (error) {
    fireSwalError(error);
  } finally {
    await initNominations()
  }
}

export const handleUnapprovalUser = async ({
  reviewer,
  reviewee,
  initNominations,
}) => {
  try {
    await unapproveNomination({
      revieweeId: reviewee.id,
      reviewerId: reviewer.id,
    })
    fireSwalSuccess({ text: 'User unapproved successfully!' });
  } catch (error) {
    fireSwalError(error);
  } finally {
    await initNominations()
  }
}