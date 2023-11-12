import { downloadTxtFile } from "../views/Reports/utils"

export const DownloadButton = ({
  text,
  data,
  filename,
}) => {
  return (
    <div className="d-flex flex-row-reverse my-1">
      <button
        className='btn btn-primary btn-sm m-1'
        onClick={() => {
          downloadTxtFile(data, filename)
        }}
      >
        {text ?? 'Download CSV'}
      </button>
    </div>
  )
}