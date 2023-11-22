import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <h4>Competency</h4>,
    cell: row => row.title,
  },
  {
    name: <h4>Supervisor</h4>,
    cell: row => row.supAvgScore,
  },
  {
    name: <h4>Peers</h4>,
    cell: row => row.peerAvgScore,
  },
  {
    name: <h4>Subordinates</h4>,
    cell: row => row.subAvgScore,
  },
  {
    name: <h4>Self</h4>,
    cell: row => row.selfAvgScore,
  },
  {
    name: <h4>Total Average</h4>,
    cell: row => row.totalAvgScore,
  },
];

const customStyles = {
  headers: {
    style: {
      fontSize: '6px',
    },
  },
};

const FeedbackScores = ({ reports }) => {

  return (
    <>
      <DataTable
        columns={columns}
        data={reports}
        highlightOnHover
        customStyles={customStyles}
      />
    </>
  );
}

export default FeedbackScores;
