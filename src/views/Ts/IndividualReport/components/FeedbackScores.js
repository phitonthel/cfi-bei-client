import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <b>Competency</b>,
    cell: row => row.title,
  },
  {
    name: <b>Supervisor</b>,
    cell: row => row.supAvgScore,
  },
  {
    name: <b>Peers</b>,
    cell: row => row.peerAvgScore,
  },
  {
    name: <b>Subordinates</b>,
    cell: row => row.subAvgScore,
  },
  {
    name: <b>Self</b>,
    cell: row => row.selfAvgScore,
  },
  {
    name: <b>Total Average</b>,
    cell: row => row.totalAvgScore,
  },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: '16px',
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
