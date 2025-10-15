

const UserProfile = ({
  user
}) => {
  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-8">
          <h3 >Profile</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NIK</td>
                <td>{user.nik}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{user.fullname}</td>
              </tr>
              <tr>
                <td>Directorate</td>
                <td>{user.directorate}</td>
              </tr>
              <tr>
                <td>Division</td>
                <td>{user.division}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{user.positionName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              {/* FOR CFI ONLY */}
              {user.cfiRole &&
                <tr>
                  <td>Competency Mapping</td>
                  <td>{user.cfiRole}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserProfile