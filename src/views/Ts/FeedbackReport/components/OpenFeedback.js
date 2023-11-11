const OpenFeedback = ({
  essayReports
}) => {
  const strengths = essayReports.filter(report => report.type === 'STRENGTH' && report.feedback.trim() !== '');
  const weaknesses = essayReports.filter(report => report.type === 'WEAKNESS' && report.feedback.trim() !== '');
  const start = essayReports.filter(report => report.type === 'START' && report.feedback.trim() !== '');

  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-12">
          <h2>Feedback from Members</h2>
          
          {strengths.length > 0 && (
            <>
              <h4>Continue Doing:</h4>
              {strengths.map((report, index) => (
                <p key={index} className="card p-2" style={{ backgroundColor: "#e6f9e6" }}>
                  {report.feedback}
                </p>
              ))}
            </>
          )}

          {weaknesses.length > 0 && (
            <>
              <h4>Start To Do:</h4>
              {weaknesses.map((report, index) => (
                <p key={index} className="card p-2" style={{ backgroundColor: "#ffdddc" }}>
                  {report.feedback}
                </p>
              ))}
            </>
          )}

          {start.length > 0 && (
            <>
              <h4>Stop To Do:</h4>
              {start.map((report, index) => (
                <p key={index} className="card p-2" style={{ backgroundColor: "#ffffe0" }}>
                  {report.feedback}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default OpenFeedback;
