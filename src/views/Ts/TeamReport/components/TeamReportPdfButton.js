import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Document, Page, Text, View, StyleSheet, pdf, Svg, Line, Rect } from '@react-pdf/renderer';
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
  tableCell: {
    margin: 2,
    fontSize: 10,
    padding: 5,
    textAlign: 'center',
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
  const chartData = reports.filter(r => r.title !== 'Total Average by Rater');
  if (chartData.length === 0) return null;

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

  const barWidth = plotWidth / chartData.length * 0.7;
  const spacing = plotWidth / chartData.length;

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
        Team Feedback Summary Chart
      </Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = marginTop + plotHeight - (i * plotHeight / 4);
          return (
            <React.Fragment key={i}>
              <Line x1={marginLeft} y1={y} x2={marginLeft + plotWidth} y2={y} stroke="#E0E0E0" strokeWidth={1} />
              <Text x={marginLeft - 10} y={y + 3} style={{ fontSize: 8, textAnchor: 'end' }}>
                {(i * yMax / 5).toFixed(1)}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Axes */}
        <Line x1={marginLeft} y1={marginTop} x2={marginLeft} y2={marginTop + plotHeight} stroke="#333333" strokeWidth={2} />
        <Line x1={marginLeft} y1={marginTop + plotHeight} x2={marginLeft + plotWidth} y2={marginTop + plotHeight} stroke="#333333" strokeWidth={2} />

        {/* Bars and labels */}
        {chartData.map((report, index) => {
          const score = parseFloat(report.totalAvgScore) || 0;
          const barHeight = score * yScale;
          const x = marginLeft + index * spacing + (spacing - barWidth) / 2;
          const y = marginTop + plotHeight - barHeight;

          return (
            <React.Fragment key={index}>
              <Rect x={x} y={y} width={barWidth} height={barHeight} fill="#000080" />
              <Text x={x + barWidth / 2} y={y - 5} style={{ fontSize: 7, textAnchor: 'middle', fontWeight: 'bold' }}>
                {score.toFixed(2)}
              </Text>
              {(() => {
                const title = report.title;
                const maxCharsPerLine = 15;
                const lines = [];
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

                const displayLines = lines.slice(0, 3);
                if (lines.length > 3) {
                  displayLines[2] = displayLines[2].substring(0, 12) + '...';
                }

                return displayLines.map((line, lineIndex) => (
                  <Text key={lineIndex} x={x + barWidth / 2} y={marginTop + plotHeight + 12 + (lineIndex * 8)}
                    style={{ fontSize: 5, textAnchor: 'middle' }}>
                    {line}
                  </Text>
                ));
              })()}
            </React.Fragment>
          );
        })}

        {/* Y-axis label */}
        <Text x={15} y={marginTop + plotHeight / 2} style={{ fontSize: 5, fontWeight: 'bold', textAnchor: 'middle' }}>
          Avg Score
        </Text>

        {/* Legend */}
        <Rect x={marginLeft + plotWidth - 150} y={10} width={12} height={12} fill="#000080" />
        <Text x={marginLeft + plotWidth - 135} y={18} style={{ fontSize: 9 }}>
          Total Average Score
        </Text>
      </Svg>
    </View>
  );
};

// React-PDF Document Component for Team Report
const TeamReportDocument = ({ reviewee, reports }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>360 Degree Team Report</Text>
      <Text style={styles.subtitle}>
        {reviewee.level === 'Kepala Divisi'
          ? `Divisi ${reviewee.division}`
          : `Direktorat ${reviewee.directorate}`}
      </Text>

      {/* About 360 Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is 360-degree Feedback?</Text>
        <Text style={styles.text}>
          360-degree feedback is a process in which an individual receives feedback
          from multiple sources, including peers, managers, subordinates, and other
          stakeholders. This comprehensive feedback allows the individual to gain
          insights into their strengths and areas for improvement from different
          perspectives.
        </Text>
      </View>

      {/* Chart Section */}
      {reports && reports.length > 0 && (
        <View style={styles.section} break={true}>
          <BarChartPDF reports={reports} />
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footer}>
        360 Degree Team Report - Generated on {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Text>
    </Page>
  </Document>
);

// Team Report PDF Download Button Component
export const TeamReportPdfButton = ({ reviewee, reports, buttonText = 'Download PDF' }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      console.log('Generating team report PDF...');

      // Generate filename
      const teamName = reviewee.level === 'Kepala Divisi'
        ? reviewee.division
        : reviewee.directorate;
      const nik = reviewee.nik || 'no_nik';
      const filename = `360_team_report_${nik}_${teamName.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;

      // Create the PDF blob using react-pdf
      const blob = await pdf(<TeamReportDocument reviewee={reviewee} reports={reports} />).toBlob();

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
        className="btn btn-secondary"
        onClick={handleDownload}
        disabled={isDownloading}
        style={{
          opacity: isDownloading ? 0.7 : 1,
          cursor: isDownloading ? 'not-allowed' : 'pointer',
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

// Bulk Team Report Download Button Component (SUPERADMIN only)
export const BulkTeamReportDownloadButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  const [currentTeam, setCurrentTeam] = useState('');
  const authUser = useSelector(state => state.auth.user);

  // Only show for SUPERADMIN
  if (authUser?.level !== 'SUPERADMIN') {
    return null;
  }

  const generateTeamReport = async (userId, reviewee, reports) => {
    try {
      const teamName = reviewee.level === 'Kepala Divisi'
        ? reviewee.division
        : reviewee.directorate;

      console.log(`Generating team report PDF for ${teamName}...`);
      setCurrentTeam(teamName);

      const nik = reviewee.nik || 'no_nik';
      const filename = `360_team_report_${nik}_${teamName.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
      const blob = await pdf(<TeamReportDocument reviewee={reviewee} reports={reports} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`PDF download triggered for: ${filename}`);
      return { success: true, team: teamName };
    } catch (error) {
      console.error(`Failed to download report for ${reviewee.division || reviewee.directorate}:`, error);
      return { success: false, team: reviewee.division || reviewee.directorate, error: error.message };
    }
  };

  const handleBulkDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // Fetch all users
      const { fetchTsIndividualReportTable } = await import('../../../../apis/report/fetchTsIndividualReportTable');
      const { fetchTsTeamReport } = await import('../../../../apis/report/fetchTsTeamReport');
      const Swal = (await import('sweetalert2')).default;

      const userData = await fetchTsIndividualReportTable();

      // Filter users who are "Kepala Divisi" or "Direktur"
      const teamLeaders = Object.values(userData)
        .filter(user => user.level === "Kepala Divisi" || user.level === "Direktur")
        .map(user => ({
          id: user.id,
          fullname: user.fullname,
          level: user.level,
          division: user.division,
          directorate: user.directorate
        }));

      if (teamLeaders.length === 0) {
        Swal.fire({
          title: 'No Team Leaders Found',
          text: 'No users with "Kepala Divisi" or "Direktur" level found.',
          icon: 'info',
        });
        setIsDownloading(false);
        return;
      }

      // Confirm download
      const result = await Swal.fire({
        title: 'Bulk Team Report Download',
        text: `Are you sure you want to download ${teamLeaders.length} team PDF reports? This includes all divisions and directorates.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download all!',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) {
        setIsDownloading(false);
        return;
      }

      // Start downloading
      setDownloadProgress({ current: 0, total: teamLeaders.length });

      const results = [];

      for (let i = 0; i < teamLeaders.length; i++) {
        const user = teamLeaders[i];
        setDownloadProgress({ current: i + 1, total: teamLeaders.length });

        try {
          // Fetch team report data for this user
          const { reviewee, reports } = await fetchTsTeamReport(user.id);

          const result = await generateTeamReport(user.id, reviewee, reports);
          results.push(result);
        } catch (error) {
          console.error(`Failed to fetch/generate report for ${user.fullname}:`, error);
          results.push({
            success: false,
            team: user.division || user.directorate,
            error: error.message
          });
        }

        // Small delay between downloads to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Show completion summary
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success);

      let message = `Download completed!\nSuccessful: ${successful}\nFailed: ${failed.length}`;

      if (failed.length > 0) {
        const failedTeams = failed.map(f => f.team).slice(0, 5);
        message += `\n\nFailed downloads:\n${failedTeams.join('\n')}`;
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
      const Swal = (await import('sweetalert2')).default;
      await Swal.fire({
        title: 'Error',
        text: `Bulk download failed: ${error.message}`,
        icon: 'error',
      });
    } finally {
      setIsDownloading(false);
      setDownloadProgress({ current: 0, total: 0 });
      setCurrentTeam('');
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
          : 'Bulk Download All Team Reports'
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
            Currently generating PDF for: <strong>{currentTeam}</strong>
          </small>
        </div>
      )}
    </div>
  );
};

export default TeamReportPdfButton;
