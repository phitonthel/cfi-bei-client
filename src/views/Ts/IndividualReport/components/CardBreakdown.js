import React from 'react';

const CardBreakdown = ({
  title,
  subAvgScore,
  peerAvgScore,
  supAvgScore,
  selfAvgScore,
  totalAvgScore,
}) => {
  return (
    <div className="col-8 my-3">
      <div className="">
        <div className="bg-secondary text-white p-1 px-2 rounded" style={{ fontSize: '18px' }}>
          {title}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Rated By</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Supervisor</td>
              <td>{supAvgScore}</td>
            </tr>
            <tr>
              <td>Peers</td>
              <td>{peerAvgScore}</td>
            </tr>
            <tr>
              <td>Subordinates</td>
              <td>{subAvgScore}</td>
            </tr>
            <tr>
              <td>Self</td>
              <td>{selfAvgScore}</td>
            </tr>
            <tr>
              <td>Total Average</td>
              <td>{totalAvgScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardBreakdown;
