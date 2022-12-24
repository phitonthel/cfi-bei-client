import { LoadingSpinner } from "./LoadingSpinner"


export const SubmitButton = ({
  text,
  onClick,
  isSubmitting,
}) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={!isSubmitting ? onClick : () => {}}
    >
      {!isSubmitting && text}
      {isSubmitting && <div className='d-flex justify-content-center'>
        <LoadingSpinner
          mainText={''}
          text={''}
          style={{}}
        />
        <div className="mt-1 mx-2">
          Submitting...
        </div>
      </div>}
    </button>
  )
}