import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { approveAllNomination } from "../../../apis/tsAssessment/approveAllNomination";

const ApproveAllNominationButton = ({
  buttonText,
  onFormSubmit: notifyParent
}) => {
  const handleButtonClick = async (event) => {
    try {
      event.preventDefault();
      const result = await Swal.fire({
        title: `This action can not be undone!`,
        text: `This will approve all unnominated nominations. All unapproved nominations will not be affected. Continue?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes`,
        cancelButtonText: `Cancel`,
      })

      if (result.isConfirmed) {
        await approveAllNomination()
        fireSwalSuccess({ text: 'All nominations has been approved!' });
      }
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