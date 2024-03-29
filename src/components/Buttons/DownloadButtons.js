import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { downloadTxtFile } from "../../views/Reports/utils"
import { handleDownloadPDF } from "../../utils/handleDownloadPdf";

export const DownloadPdfButton = ({
  reportRef,
  filename,
}) => {
  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-secondary"
        onClick={() => handleDownloadPDF(reportRef, filename)}
      >
        <FontAwesomeIcon className="mr-2" icon={faDownload} />
        Download PDF
      </button>
    </div>
  )
}

export const DownloadCsvButton = ({
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
        <FontAwesomeIcon className="mr-2" icon={faDownload} />
        {text ?? 'Download CSV'}
      </button>
    </div>
  )
}