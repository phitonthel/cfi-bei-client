import { useSelector } from 'react-redux';

const BaseInstructions = ({
  instructions,
  title,
}) => {
  const authUser = useSelector(state => state.auth.user);

  return (
    <div>
      <div className="card mb-4 border-secondary">
        <div className="card-header text-white bg-secondary">
          <h5 className="mb-2">{title ? title : 'Instructions:'}</h5>
        </div>
        <div className="card-body bg-light">
        {
          instructions.map((text, i) => <p className="card-text p-0 m-0">{`${text}`}</p>)
        }
        </div>
      </div>
    </div>
  )
};


export default BaseInstructions