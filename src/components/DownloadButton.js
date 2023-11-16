import { downloadTxtFile } from "../views/Reports/utils"

export const DownloadButton = ({
  text,
  data,
  filename,
}) => {
  return (
    <div className="">
      <button
        className='btn btn-primary btn-sm mx-1'
        onClick={() => {
          downloadTxtFile(data, filename)
        }}
      >
        {text ?? 'Download CSV'}
      </button>
    </div>
  )
}