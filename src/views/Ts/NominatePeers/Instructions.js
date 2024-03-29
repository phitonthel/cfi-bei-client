import { useSelector } from 'react-redux';

const createText = (authUser) => {
  if (authUser.level === 'Kepala Divisi') {
    return [
      'Nominate max 3 peers (Kepala Divisi/Advisor).',
      'Prioritise picking members from your division/directorate first before others.'
    ]
  }

  if (authUser.level === 'Kepala Unit') {
    return [
      'Nominate 2-3 peers (Kepala Unit/Expert).',
      'Prioritise picking members from your division first before others.'
    ]
  }

  if (authUser.level === 'Kepala Kantor') {
    return [
      'Nominate 2-3 peers (Kepala Kantor).',
      'Prioritise picking members from your unit first before others.'
    ]
  }
}

const Instructions = () => {
  const authUser = useSelector(state => state.auth.user);
  const texts = createText(authUser)

  return (
    <div>
      <div className="card mb-4 border-secondary"> {/* Custom border color */}
        <div className="card-header text-white bg-secondary"> {/* Custom background color */}
          <h5 className="mb-2">Instructions:</h5>
        </div>
        <div className="card-body bg-light"> {/* Light background for the body */}
          {
            texts.map((text, i) => <p className="card-text p-0 m-0">{`${i + 1}. ${text}`}</p>)
          }
        </div>
      </div>
    </div>
  )
};


export default Instructions