

const Profile = ({
  user
}) => {
  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-8">
          <h2 >Profile</h2>
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
                <td>{user.Division?.name}</td>
              </tr>
              <tr>
                <td>Level</td>
                <td>{user.level}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Profile