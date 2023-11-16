const ScoringLegend = ({
  title,
  arrText,
  subArrText,
  isReversed,
}) => (
  <div className="card mb-4 border-secondary"> {/* Custom border color */}
    <div className="card-header text-white bg-secondary"> {/* Custom background color */}
      <h5 className="mb-2">{title}</h5>
    </div>
    <div className="card-body bg-light"> {/* Light background for the body */}
      {
        arrText.map((text, idx) => {
          const numbering = isReversed ? `${arrText.length - idx}:` : `${idx + 1}:`
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <p style={{ marginRight: '8px', marginBottom: '0' }}>{numbering}</p>
                <p className="p-0 m-0">{text}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <p style={{ marginRight: '20px', marginBottom: '0' }}></p>
                <p className="p-0 m-0">{subArrText[idx]}</p>
              </div>
            </>
          )
        })
      }
    </div>
  </div>
);


export default ScoringLegend