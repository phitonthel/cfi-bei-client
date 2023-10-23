import React from 'react';

const CardBreakdown = ({ categoryName, data }) => {
  return (
    <div className="col-8 my-3">
      <div>
        <div className="bg-secondary text-white p-1 px-2 rounded" style={{ fontSize: '18px' }}>
          {categoryName}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Rated By</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((assessment, index) => (
              <tr key={index}>
                <td>{assessment.reviewerId}</td>
                <td>{assessment.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardBreakdown;
