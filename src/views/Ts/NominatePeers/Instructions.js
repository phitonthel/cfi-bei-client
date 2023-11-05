import { useSelector } from 'react-redux';

const createText = (authUser) => {
  if (authUser.level === 'Kepala Divisi') {
    return 'Nominate max 3 peers (Kepala Divisi/Advisor).'
  }

  if (authUser.level === 'Kepala Unit') {
    return 'Nominate max 3 peers (Kepala Unit/Expert).'
  }

  if (authUser.level === 'Kepala Kantor') {
    return 'Nominate max 3 peers (Kepala Kantor).'
  }
}

const Instructions = () => {
  const authUser = useSelector(state => state.auth.user);
  const text = createText(authUser)

  return (
    <div>
      <div className="card mb-4 border-secondary"> {/* Custom border color */}
        <div className="card-header text-white bg-secondary"> {/* Custom background color */}
          <h5 className="mb-2">Instructions:</h5>
        </div>
        <div className="card-body bg-light"> {/* Light background for the body */}
          <p className="card-text p-0 m-0">1: {text}</p>
          <p className="card-text p-0 m-0">2: Prioritise picking members from your division first before others.</p>
        </div>
      </div>
    </div>
  )
};


export default Instructions