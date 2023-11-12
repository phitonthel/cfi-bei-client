import { useSelector } from 'react-redux';

const createText = (authUser) => {
  if (authUser.level === 'Kepala Divisi') {
    return [
      'Nominate 2-5 Kepala Unit and 3 KK/Spesialis/Staf.',
      'Prioritise picking members from your division/directorate first before others.'
    ]
  }

  if (authUser.level === 'Kepala Unit') {
    return [
      'Nominate 2-4 KK/Spesialis/Staf.',
      'Prioritise picking members from your unit first before others.'
    ]
  }

  if (authUser.level === 'Kepala Kantor') {
    return [
      'Nominate 2 Trainer or Staf Administrasi Kantor Perwakilan.',
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