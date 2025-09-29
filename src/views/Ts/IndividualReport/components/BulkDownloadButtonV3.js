import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Import APIs
import { fetchTsIndividualReportTable } from '../../../../apis/report/fetchTsIndividualReportTable';
import { fetchTsIndividualReport } from '../../../../apis/report/fetchTsIndividualReport';
import { handleDownloadPDF } from '../../../../utils/handleDownloadPdf';
import { fireSwalError } from '../../../../apis/fireSwal';

const BulkDownloadButtonV3 = ({ reportRef, onDataUpdate }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  const [currentUser, setCurrentUser] = useState('');
  const authUser = useSelector(state => state.auth.user);

  // Only show for SUPERADMIN
  if (authUser?.level !== 'SUPERADMIN') {
    return null;
  }

  const downloadSingleReport = async (user) => {
    try {
      console.log(`Fetching and rendering report for ${user.fullname}`);
      setCurrentUser(user.fullname);

      // Fetch the report data for this user
      const reportData = await fetchTsIndividualReport(user.id);

      // Update the page with this user's data
      onDataUpdate({
        reviewee: reportData.reviewee,
        reports: reportData.reports,
        essayReports: reportData.essayReports,
        isLoading: false
      });

      // Wait for the page to render completely
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate filename
      const filename = `360_individual_report_${user.fullname.toLowerCase().replace(/\s+/g, '_')}`;

      console.log(`Starting PDF generation for: ${filename}`);

      // Use the existing page render to generate PDF
      await handleDownloadPDF(reportRef, filename);

      console.log(`PDF generation completed for: ${filename}`);

      return { success: true, user: user.fullname };
    } catch (error) {
      console.error(`Failed to download report for ${user.fullname}:`, error);
      return { success: false, user: user.fullname, error: error.message };
    }
  };

  const handleBulkDownload = async () => {
    if (isDownloading) return;

    try {
      // First, fetch all users
      setIsDownloading(true);
      const userData = await fetchTsIndividualReportTable();

      // Convert object to array and extract id and fullname
      const users = Object.values(userData).map(user => ({
        id: user.id,
        fullname: user.fullname
      })).slice(5, 7); // Limit to first 2 users for demo purposes

      if (users.length === 0) {
        Swal.fire({
          title: 'No Users Found',
          text: 'No users available for bulk download.',
          icon: 'info',
        });
        return;
      }

      // Confirm download
      const result = await Swal.fire({
        title: 'Bulk PDF Download',
        text: `Are you sure you want to download ${users.length} PDF reports? The page will update with each user's data during download.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download all!',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return;

      // Start downloading
      setDownloadProgress({ current: 0, total: users.length });

      const results = [];

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        setDownloadProgress({ current: i + 1, total: users.length });

        const result = await downloadSingleReport(user);
        results.push(result);

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Show completion summary
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success);

      let message = `Download completed!\nSuccessful: ${successful}\nFailed: ${failed.length}`;

      if (failed.length > 0) {
        const failedUsers = failed.map(f => f.user).slice(0, 5);
        message += `\n\nFailed downloads:\n${failedUsers.join('\n')}`;
        if (failed.length > 5) {
          message += `\n... and ${failed.length - 5} more`;
        }
      }

      await Swal.fire({
        title: 'Bulk Download Complete',
        text: message,
        icon: failed.length === 0 ? 'success' : 'warning',
      });

    } catch (error) {
      console.error('Bulk download failed:', error);
      fireSwalError(error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress({ current: 0, total: 0 });
      setCurrentUser('');
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-success"
        onClick={handleBulkDownload}
        disabled={isDownloading}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={isDownloading ? faSpinner : faDownload}
          spin={isDownloading}
        />
        {isDownloading
          ? `Downloading... (${downloadProgress.current}/${downloadProgress.total})`
          : 'Bulk Download All Reports (Page Render)'
        }
      </button>

      {isDownloading && (
        <div className="mt-2">
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{
                width: `${(downloadProgress.current / downloadProgress.total) * 100}%`
              }}
            >
              {Math.round((downloadProgress.current / downloadProgress.total) * 100)}%
            </div>
          </div>
          <small className="text-muted">
            Currently generating PDF for: <strong>{currentUser}</strong>
          </small>
          <br />
          <small className="text-muted">
            Please don't close this page during download
          </small>
        </div>
      )}
    </div>
  );
};

export default BulkDownloadButtonV3;