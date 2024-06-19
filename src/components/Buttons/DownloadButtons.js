import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleDownloadPDF, handleDownloadPDFV2 } from "../../utils/handleDownloadPdf";
import { downloadTxtFile } from "../../views/Reports/utils"

export const DownloadPdfButton = ({
  reportRef,
  filename,
  buttonText,
}) => {
  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-secondary"
        onClick={() => handleDownloadPDF(reportRef, filename)}
      >
        <FontAwesomeIcon className="mr-2" icon={faDownload} />
        {buttonText || `Download PDF`}
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