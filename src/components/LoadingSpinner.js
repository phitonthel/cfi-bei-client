export const LoadingSpinner = () => {
  return (
    <div className="">
      <div className='d-flex justify-content-center' style={{ marginTop: '80px' }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className='d-flex justify-content-center' style={{ marginTop: '10px' }}>
        Loading
      </div>
      <div className='d-flex justify-content-center'>
        This may take few minutes
      </div>
    </div>
  )
}