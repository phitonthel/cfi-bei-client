import React from 'react';

const CardBreakdown = ({
  categoryName,
}) => {
  return (
    <div className="col-8 my-3">
      <div className="">
        <div className="bg-secondary text-white p-1 px-2 rounded" style={{ fontSize: '18px' }}>
          { categoryName }
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
              <td>Superior</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Peers</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Subordinates</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Self</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardBreakdown;
