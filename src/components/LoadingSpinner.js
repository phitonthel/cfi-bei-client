export const LoadingSpinner = ({
  mainText,
  text,
  style,
}) => {
  return (
    <div className="">
      <div className='d-flex justify-content-center' style={style || { marginTop: '80px' }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className='d-flex justify-content-center' style={style || { marginTop: '10px' }}>
        {mainText ?? 'Loading'}
      </div>
      <div className='d-flex justify-content-center'>
        {text}
      </div>
    </div>
  )
}