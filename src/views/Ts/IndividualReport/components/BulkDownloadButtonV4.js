import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Document, Page, Text, View, StyleSheet, Image, pdf, Svg, Line, Rect, Path } from '@react-pdf/renderer';

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

// Custom Bar Chart Component using React-PDF
const BarChartPDF = ({ reports }) => {
  // Filter out the total average row
  const chartData = reports.filter(r => r.title !== 'Total Average by Rater');

  if (chartData.length === 0) return null;

  // Chart dimensions
  const chartWidth = 500;
  const chartHeight = 250;
  const marginLeft = 60;
  const marginRight = 20;
  const marginTop = 30;
  const marginBottom = 100;
  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;

  // Set Y axis maximum to 4 (fixed scale)
  const yMax = 4;
  const yScale = plotHeight / yMax;

  // Bar width and spacing
  const barWidth = plotWidth / chartData.length * 0.7;
  const spacing = plotWidth / chartData.length;

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
        Feedback Summary Chart
      </Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = marginTop + plotHeight - (i * plotHeight / 4);
          return (
            <React.Fragment key={i}>
              <Line
                x1={marginLeft}
                y1={y}
                x2={marginLeft + plotWidth}
                y2={y}
                stroke="#E0E0E0"
                strokeWidth={1}
              />
              <Text
                x={marginLeft - 10}
                y={y + 3}
                style={{ fontSize: 8, textAnchor: 'end' }}
              >
                {(i * yMax / 4).toFixed(1)}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Axes */}
        <Line
          x1={marginLeft}
          y1={marginTop}
          x2={marginLeft}
          y2={marginTop + plotHeight}
          stroke="#333333"
          strokeWidth={2}
        />
        <Line
          x1={marginLeft}
          y1={marginTop + plotHeight}
          x2={marginLeft + plotWidth}
          y2={marginTop + plotHeight}
          stroke="#333333"
          strokeWidth={2}
        />

        {/* Bars and labels */}
        {chartData.map((report, index) => {
          const score = parseFloat(report.totalAvgScore) || 0;
          const barHeight = score * yScale;
          const x = marginLeft + index * spacing + (spacing - barWidth) / 2;
          const y = marginTop + plotHeight - barHeight;

          return (
            <React.Fragment key={index}>
              {/* Bar */}
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#000080"
              />

              {/* Score label on top of bar */}
              <Text
                x={x + barWidth / 2}
                y={y - 5}
                style={{ fontSize: 7, textAnchor: 'middle', fontWeight: 'bold' }}
              >
                {score.toFixed(2)}
              </Text>

              {/* X-axis label (competency name) - split into multiple lines if needed */}
              {(() => {
                const title = report.title;
                const maxCharsPerLine = 15;
                const lines = [];

                // Split title into words
                const words = title.split(' ');
                let currentLine = '';

                words.forEach(word => {
                  if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
                    currentLine = (currentLine + ' ' + word).trim();
                  } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word;
                  }
                });
                if (currentLine) lines.push(currentLine);

                // Limit to 3 lines max
                const displayLines = lines.slice(0, 3);
                if (lines.length > 3) {
                  displayLines[2] = displayLines[2].substring(0, 12) + '...';
                }

                return displayLines.map((line, lineIndex) => (
                  <Text
                    key={lineIndex}
                    x={x + barWidth / 2}
                    y={marginTop + plotHeight + 12 + (lineIndex * 8)}
                    style={{
                      fontSize: 5,
                      textAnchor: 'middle'
                    }}
                  >
                    {line}
                  </Text>
                ));
              })()}
            </React.Fragment>
          );
        })}

        {/* Y-axis label */}
        <Text
          x={15}
          y={marginTop + plotHeight / 2}
          style={{
            fontSize: 5,
            fontWeight: 'bold',
            textAnchor: 'middle',
          }}
        >
          Avg Score
        </Text>

        {/* Legend */}
        <Rect
          x={marginLeft + plotWidth - 150}
          y={10}
          width={12}
          height={12}
          fill="#000080"
        />
        <Text
          x={marginLeft + plotWidth - 135}
          y={18}
          style={{ fontSize: 9 }}
        >
          Total Average Score
        </Text>
      </Svg>
    </View>
  );
};

// React-PDF Document Component
const ReportDocument = ({ reportData, authUser }) => (
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

      {/* Graph Section - Native React-PDF Chart */}
      {reportData.reports && reportData.reports.length > 0 && (
        <View style={styles.section} break={true}>
          <BarChartPDF reports={reportData.reports} />
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

          // Split feedback into chunks of 3 items
          const chunks = [];
          for (let i = 0; i < groupReports.length; i += 3) {
            chunks.push(groupReports.slice(i, i + 3));
          }

          // Render each chunk as a separate section with page breaks
          return chunks.map((chunk, chunkIndex) => (
            <View
              key={`${groupIndex}-${chunkIndex}`}
              style={[styles.section, { marginBottom: 20 }]}
              break={groupIndex > 0 || chunkIndex > 0}
            >
              <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 8, color: group.color }]}>
                {group.title}{chunkIndex > 0 ? ' (continued)' : ''}
              </Text>
              <Text style={[styles.text, { fontSize: 11, fontStyle: 'italic', marginBottom: 12, color: '#666666' }]}>
                {group.description}
              </Text>

              {/* Display feedback items in this chunk */}
              {chunk.map((report, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: group.bgColor,
                    padding: 12,
                    marginBottom: 10,
                    border: `1pt solid ${group.color}`,
                    borderRadius: 4
                  }}
                >
                  <Text style={[styles.text, { fontSize: 11, lineHeight: 1.5 }]}>
                    {report.feedback}
                  </Text>
                </View>
              ))}
            </View>
          ));
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
                  <View style={[styles.tableRow, { backgroundColor: '#0066CC' }]} wrap={false}>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '20%' }]}>Type</Text>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '20%' }]}>Avg. Score</Text>
                    <Text style={[styles.tableCell, { color: 'white', fontWeight: 'bold', width: '60%' }]}>Justifications</Text>
                  </View>

                  {/* Table Rows */}
                  {report.justificationTypes.map((justificationType, index) => (
                    <View
                      key={index}
                      style={[styles.tableRow, {
                        backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white',
                        minHeight: 30
                      }]}
                      wrap={false}
                    >
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

// Shared function to generate and download a single PDF report
const generatePdfReport = async (userId, userFullname, authUser, setCurrentUser = null) => {
  try {
    console.log(`Generating react-pdf report for ${userFullname}`);
    if (setCurrentUser) setCurrentUser(userFullname);

    // Fetch the report data for this user
    const reportData = await fetchTsIndividualReport(userId);

    // Generate filename
    const filename = `360_individual_report_${userFullname.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;

    // Create the PDF blob using react-pdf with native chart rendering
    const blob = await pdf(<ReportDocument
      reportData={reportData}
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

    return { success: true, user: userFullname };
  } catch (error) {
    console.error(`Failed to download report for ${userFullname}:`, error);
    return { success: false, user: userFullname, error: error.message };
  }
};

// Single User Download Button Component (accessible to everyone)
export const SingleDownloadButton = ({ userId, userFullname, buttonText = 'Download Report', className = 'btn btn-primary' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const authUser = useSelector(state => state.auth.user);

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      await generatePdfReport(userId, userFullname, authUser);

      await Swal.fire({
        title: 'Success!',
        text: 'PDF report has been downloaded successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Download failed:', error);
      fireSwalError(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        className={className}
        onClick={handleDownload}
        disabled={isDownloading}
        style={{
          opacity: isDownloading ? 0.7 : 1,
          cursor: isDownloading ? 'not-allowed' : 'pointer',
          backgroundColor: isDownloading ? '#17a2b8' : '',
          borderColor: isDownloading ? '#17a2b8' : '',
        }}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={isDownloading ? faSpinner : faDownload}
          spin={isDownloading}
        />
        {isDownloading ? 'Generating...' : buttonText}
      </button>
    </div>
  );
};

// Bulk Download Button Component (SUPERADMIN only)
export const BulkDownloadButtonV4 = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  const [currentUser, setCurrentUser] = useState('');
  const authUser = useSelector(state => state.auth.user);

  // Only show for SUPERADMIN
  if (authUser?.level !== 'SUPERADMIN') {
    return null;
  }

  const downloadSingleReport = async (user) => {
    return await generatePdfReport(user.id, user.fullname, authUser, setCurrentUser);
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
        fullname: user.fullname,
        level: user.level
      }))
        .filter(user => user.level !== "Direktur");
      // .slice(5, 6); // Limit to first 2 users for demo purposes

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
        text: `Are you sure you want to download ${users.length} PDF reports? Each PDF will include a native chart generated with React-PDF.`,
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
        style={{
          opacity: isDownloading ? 0.7 : 1,
          cursor: isDownloading ? 'not-allowed' : 'pointer',
          backgroundColor: isDownloading ? '#17a2b8' : '',
          borderColor: isDownloading ? '#17a2b8' : '',
        }}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={isDownloading ? faSpinner : faDownload}
          spin={isDownloading}
        />
        {isDownloading
          ? `Generating... (${downloadProgress.current}/${downloadProgress.total})`
          : 'Bulk Download All Reports'
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
        </div>
      )}
    </div>
  );
};