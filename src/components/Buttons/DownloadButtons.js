import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleDownloadPDF, handleDownloadPDFV2 } from "../../utils/handleDownloadPdf";
import { arrayToCSV, downloadTxtFile } from "../../views/Reports/utils"
import { useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const DownloadPdfButton = ({
  reportRef,
  filename,
  buttonText,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = async () => {
    setIsLoading(true);
    await handleDownloadPDF(reportRef, filename);
    setIsLoading(false);
  }

  const text = isLoading ? `Processing...` : buttonText || `Download PDF`

  // if (isLoading) {
  //   return <LoadingSpinner text={`This may take a while`} />
  // }

  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-secondary"
        onClick={() => handleButtonClick()}
      >
        <FontAwesomeIcon className="mr-2" icon={faDownload} />
        {text}
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

export const GenericDownloadCsvButton = ({
  title,
  array,
  filename,
}) => {
  return (
    <div className="">
      <button
        className='btn btn-primary btn-sm mx-1'
        onClick={() => {
          downloadTxtFile(arrayToCSV(array), filename)
        }}
      >
        <FontAwesomeIcon className="mr-2" icon={faDownload} />
        {title ?? 'Download CSV'}
      </button>
    </div>
  )
}