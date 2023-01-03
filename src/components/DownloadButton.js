
export const DownloadButton = ({
  text,
  onClick,
}) => {
  return (
    <div className="d-flex flex-row-reverse my-1">
      <button
        className='btn btn-primary btn-sm m-1'
        onClick={onClick}>
        {text ?? 'Download CSV'}
      </button>
    </div>
  )
}