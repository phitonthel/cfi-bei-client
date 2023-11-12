import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';

import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { approveAllNomination } from "../../../apis/tsAssessment/approveAllNomination";

const ApproveAllNominationButton = ({
  buttonText,
  onFormSubmit: notifyParent
}) => {
  const handleButtonClick = async (event) => {
    try {
      event.preventDefault();
      await approveAllNomination()
      fireSwalSuccess({ text: 'All nominations has been approved!' });
    } catch (error) {
      fireSwalError(error)
    } finally {
      if (notifyParent) {
        notifyParent();
      }
    }
  };

  return (
    <Button className='btn btn-sm mx-1' onClick={handleButtonClick}>{buttonText}</Button>
  )
}

export default ApproveAllNominationButton