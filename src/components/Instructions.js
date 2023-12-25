const Instructions = ({texts}) => {
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

export default Instructions;