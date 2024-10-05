

const TeamProfile = ({
  user,
  nUsers,
}) => {
  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-8">
          <h4 >Team Profile</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Directorate</td>
                <td>{user.directorate}</td>
              </tr>
              <tr>
                <td>Division</td>
                <td>{user.division}</td>
              </tr>
              <tr>
                <td>Unit</td>
                <td>{user.unit || '-'}</td>
              </tr>
              <tr>
                <td>Number of People</td>
                <td>{nUsers || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TeamProfile