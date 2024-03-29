import axios from 'axios';
import Swal from 'sweetalert2';

export const fireSwalError = (
  error,
  timer,
) => {
  console.log(error);
  Swal.fire({
    position: 'top',
    icon: 'error',
    text: error?.response?.data?.message || error?.message || 'Oops...',
    showConfirmButton: false,
    timer: timer || 1000
  })
}

export const fireSwalSuccess = ({
  text,
}) => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: text ?? 'Your work has been submitted',
    showConfirmButton: false,
    timer: 1000
  })
}

export const fireSwalNominated = ({
  text,
}) => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: text ?? 'User Nominated Successfully!',
    showConfirmButton: false,
    timer: 1000
  })
}