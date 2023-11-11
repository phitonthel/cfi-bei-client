

const ScoreSummary = () => {
  return (
    < div className="row mb-4 p-4" >
      <div className="col-md-8">
        <h2>Feedback Scores - Summary</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Building Trust</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Customer Focus</td>
              <td>4.0</td>
            </tr>
            <tr>
              <td>Facilitating Change</td>
              <td>3.8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default ScoreSummary