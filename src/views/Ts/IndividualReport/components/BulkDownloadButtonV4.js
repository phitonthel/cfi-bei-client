import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

// Import APIs
import { fetchTsIndividualReportTable } from '../../../../apis/report/fetchTsIndividualReportTable';
import { fetchTsIndividualReport } from '../../../../apis/report/fetchTsIndividualReport';
import { fireSwalError } from '../../../../apis/fireSwal';

// React-PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666666',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    border: '1pt solid #DEE2E6',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#0066CC',
    fontWeight: 'bold',
    borderBottom: '2pt solid #0066CC',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 10,
    color: '#333333',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomStyle: 'solid',
    minHeight: 25,
    alignItems: 'center',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#DDDDDD',
  },
  tableCell: {
    margin: 2,
    fontSize: 10,
    padding: 5,
    textAlign: 'center',
  },
  profileTable: {
    marginBottom: 15,
  },
  profileRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #CCCCCC',
    paddingVertical: 8,
  },
  profileLabel: {
    width: '30%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileValue: {
    width: '70%',
    fontSize: 12,
    color: '#666666',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    border: '1pt solid #DDDDDD',
  },
  scoreText: {
    fontSize: 12,
    color: '#333333',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066CC',
    backgroundColor: '#E8F4FD',
    padding: 5,
    borderRadius: 3,
  },
  essayContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderLeft: '4pt solid #28A745',
  },
  essayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 10,
  },
  essayQuestion: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 5,
  },
  essayAnswer: {
    fontSize: 10,
    color: '#555555',
    lineHeight: 1.5,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',
    border: '1pt solid #DDDDDD',
  },
  essayRelationship: {
    fontSize: 9,
    color: '#FFFFFF',
    backgroundColor: '#6C757D',
    padding: 3,
    textAlign: 'right',
    alignSelf: 'flex-end',
    width: 'auto',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    border: '2pt solid #0066CC',
    padding: 15,
    textAlign: 'center',
    minWidth: 120,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666666',
  },
  // Chart container
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  chartImage: {
    width: 500,
    height: 300,
    objectFit: 'contain'
  },
  // Essay/Feedback specific styles
  essayContainer: {
    marginBottom: 15,
    padding: 10,
    border: '1pt solid #DDDDDD',
    borderRadius: 5
  },
  essayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0066CC'
  },
  essayQuestion: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333333'
  },
  essayAnswer: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.4,
    color: '#555555'
  },
  essayRelationship: {
    fontSize: 9,
    backgroundColor: '#F0F0F0',
    padding: 3,
    borderRadius: 3,
    color: 'white'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888'
  }
});

// React-PDF Document Component
const ReportDocument = ({ reportData, graphImageUrl, authUser }) => (
  <Document>
    {/* Page 1: Overview & Profile */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>360 Degree Feedback Report</Text>
      <Text style={styles.subtitle}>Feedback for: {reportData.reviewee.fullname}</Text>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.profileTable}>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>NIK:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.nik || 'N/A'}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Name:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.fullname || 'N/A'}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Directorate:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.directorate || 'N/A'}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Division:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.division || 'N/A'}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Position:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.positionName || 'N/A'}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>{reportData.reviewee.email || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* About 360 Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is 360-degree Feedback?</Text>
        <Text style={styles.text}>
          360-degree feedback is a comprehensive evaluation process in which an individual receives feedback
          from multiple sources, including peers, managers, subordinates, and other stakeholders. This multi-source
          approach provides a holistic view of an individual's performance, allowing them to gain valuable
          insights into their strengths and areas for improvement from different perspectives within the organization.
          The feedback collected helps in personal and professional development planning.
        </Text>
      </View>

      {/* Graph Section */}
      {graphImageUrl && (
        <View style={styles.section} break={true}>
          <Text style={styles.sectionTitle}>Feedback Summary Chart</Text>
          <Image
            src={graphImageUrl}
            style={{
              width: '100%',
              maxHeight: 200,
              objectFit: 'contain',
              marginBottom: 10
            }}
          />
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footer}>
        360 Degree Feedback Report - Generated on {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Text>
    </Page>

    {/* Page 2: Feedback Scores Table */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Feedback Scores</Text>
      <Text style={styles.subtitle}>Scores Breakdown</Text>

      {/* Detailed Feedback Scores Table */}
      {reportData.reports && reportData.reports.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Feedback Scores</Text>

          {/* Table Header */}
          <View style={[styles.tableRow, { backgroundColor: '#0066CC' }]}>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '30%' }]}>Competency</Text>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '14%' }]}>Supervisor</Text>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '14%' }]}>Peers</Text>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '14%' }]}>Subordinates</Text>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '14%' }]}>Self</Text>
            <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '14%' }]}>Total Avg</Text>
          </View>

          {/* Table Rows */}
          {reportData.reports.map((report, index) => (
            <View key={index} style={[styles.tableRow, {
              backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white',
              ...(report.title === "Total Average by Rater" ? { backgroundColor: '#fff9c4' } : {})
            }]}>
              <Text style={[styles.tableCell, { width: '30%', fontSize: 9 }]}>{report.title || 'N/A'}</Text>
              <Text style={[styles.tableCell, { width: '14%' }]}>{report.supAvgScore || 'N/A'}</Text>
              <Text style={[styles.tableCell, { width: '14%' }]}>{report.peerAvgScore || 'N/A'}</Text>
              <Text style={[styles.tableCell, { width: '14%' }]}>{report.subAvgScore || 'N/A'}</Text>
              <Text style={[styles.tableCell, { width: '14%' }]}>{report.selfAvgScore || 'N/A'}</Text>
              <Text style={[styles.tableCell, { width: '14%', fontWeight: 'bold' }]}>{report.totalAvgScore || 'N/A'}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>

    {/* Page 3: Open Feedback (Feedback Reflection) */}
    {reportData.essayReports && reportData.essayReports.length > 0 && (
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Feedback Reflection</Text>

        {/* Group feedback by feedback type instead of reviewer type */}
        {[
          {
            type: 'STRENGTH',
            title: 'Continue Doing',
            color: '#28A745',
            bgColor: '#e6f9e6',
            description: 'These are the strengths and positive behaviors that should be continued.'
          },
          {
            type: 'START',
            title: 'Start To Do',
            color: '#FFC107',
            bgColor: '#ffffe0',
            description: 'These are new behaviors and improvements that should be started.'
          },
          {
            type: 'WEAKNESS',
            title: 'Stop To Do',
            color: '#DC3545',
            bgColor: '#ffdddc',
            description: 'These are behaviors and practices that should be stopped or avoided.'
          }
        ].map((group, groupIndex) => {
          // Get all feedback of this type from all reviewers
          const groupReports = reportData.essayReports.filter(report =>
            report.type === group.type && report.feedback?.trim() !== ''
          );

          if (groupReports.length === 0) return null;

          return (
            <View key={groupIndex} style={[styles.section, { marginBottom: 20 }]} break={groupIndex > 0}>
              <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 8, color: group.color }]}>
                {group.title}
              </Text>
              <Text style={[styles.text, { fontSize: 11, fontStyle: 'italic', marginBottom: 12, color: '#666666' }]}>
                {group.description}
              </Text>

              {/* Display all feedback items for this type */}
              {groupReports.map((report, index) => (
                <View key={index} style={{
                  backgroundColor: group.bgColor,
                  padding: 12,
                  marginBottom: 10,
                  border: `1pt solid ${group.color}`,
                  borderRadius: 4
                }}>
                  <Text style={[styles.text, { fontSize: 11, lineHeight: 1.5 }]}>
                    {report.feedback}
                  </Text>
                  {/* Show reviewer type as a small badge */}
                  <Text style={[styles.text, {
                    fontSize: 9,
                    fontStyle: 'italic',
                    color: '#666666',
                    marginTop: 5,
                    textAlign: 'right'
                  }]}>
                    —
                    {
                      authUser?.level === 'SUPERADMIN'
                        ? report.reviewerLevelType?.toLowerCase() || 'Anonymous'
                        : 'Anonymous'
                    }
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </Page>
    )}

    {/* Page 4: Justifications */}
    {reportData.reports && reportData.reports.length > 0 && (
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Feedback Justification</Text>
        <Text style={styles.subtitle}>Detailed Justifications by Competency</Text>

        {reportData.reports
          .filter(r => r.title !== 'Total Average by Rater')
          .map((report, reportIndex) => (
            <View key={reportIndex} style={[styles.section, { marginBottom: 20 }]} break={reportIndex > 0}>
              <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 10 }]}>
                {report.title}
              </Text>

              {/* Justifications Table */}
              {report.justificationTypes && report.justificationTypes.length > 0 ? (
                <View style={styles.table}>
                  {/* Table Header */}
                  <View style={[styles.tableRow, { backgroundColor: '#0066CC' }]}>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '20%' }]}>Type</Text>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '20%' }]}>Avg. Score</Text>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '60%' }]}>Justifications</Text>
                  </View>

                  {/* Table Rows */}
                  {report.justificationTypes.map((justificationType, index) => (
                    <View key={index} style={[styles.tableRow, {
                      backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white',
                      minHeight: 30
                    }]}>
                      <Text style={[styles.tableCell, { width: '20%', fontSize: 9 }]}>
                        {justificationType.type}
                      </Text>
                      <Text style={[styles.tableCell, { width: '20%', fontSize: 9 }]}>
                        {justificationType.avgScore === null ? '(none)' : justificationType.avgScore}
                      </Text>
                      <View style={{ width: '60%', padding: 5 }}>
                        {justificationType.justifications && justificationType.justifications.length > 0 ? (
                          justificationType.justifications.map((justification, idx) => (
                            <Text key={idx} style={[styles.text, { fontSize: 9, marginBottom: 3 }]}>
                              • {justification}
                            </Text>
                          ))
                        ) : (
                          <Text style={[styles.text, { fontSize: 9, color: '#6c757d', fontStyle: 'italic' }]}>
                            (none)
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={[styles.text, { fontStyle: 'italic', color: '#666666' }]}>
                  No justification data available for this competency
                </Text>
              )}
            </View>
          ))}
      </Page>
    )}
  </Document>
);

const BulkDownloadButtonV4 = () => {
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
      console.log(`Generating react-pdf report for ${user.fullname}`);
      setCurrentUser(user.fullname);

      // Fetch the report data for this user
      const reportData = await fetchTsIndividualReport(user.id);

      // Capture the graph as an image
      let graphImageUrl = null;
      try {
        // Look for the graph container on the page
        const graphElement = document.querySelector('.recharts-wrapper');
        if (graphElement) {
          console.log('Capturing graph image...');
          const canvas = await html2canvas(graphElement, {
            backgroundColor: 'white',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
          });
          graphImageUrl = canvas.toDataURL('image/png');
          console.log('Graph image captured successfully');
        } else {
          console.log('Graph element not found on page');
        }
      } catch (graphError) {
        console.error('Failed to capture graph:', graphError);
      }

      // Generate filename
      const filename = `360_individual_report_${user.fullname.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;

      // Create the PDF blob using react-pdf
      const blob = await pdf(<ReportDocument
        reportData={reportData}
        graphImageUrl={graphImageUrl}
        authUser={authUser}
      />).toBlob();

      // Create download link and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`PDF download triggered for: ${filename}`);

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
      })).slice(5, 6); // Limit to first 2 users for demo purposes

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
        title: 'Bulk PDF Download (React-PDF)',
        text: `Are you sure you want to download ${users.length} PDF reports using React-PDF? Each PDF will be generated programmatically.`,
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

        // Small delay between downloads to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 1500));
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
        className="btn btn-info"
        onClick={handleBulkDownload}
        disabled={isDownloading}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={isDownloading ? faSpinner : faDownload}
          spin={isDownloading}
        />
        {isDownloading
          ? `Generating... (${downloadProgress.current}/${downloadProgress.total})`
          : 'Bulk Download All Reports (React-PDF)'
        }
      </button>

      {isDownloading && (
        <div className="mt-2">
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
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
            Using React-PDF for programmatic generation
          </small>
        </div>
      )}
    </div>
  );
};

export default BulkDownloadButtonV4;