import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <b>Competency</b>,
    cell: row => row.competency,
  },
  {
    name: <b>Type</b>,
    cell: row => row.type,
  },
  {
    name: <b>Expected Score</b>,
    cell: row => row.expectedScore,
  },
  {
    name: <b>Self Score</b>,
    cell: row => row.selfScore,
  },
  {
    name: <b>Actual Score</b>,
    cell: row => row.actualScore,
  },
  {
    name: <b>Gap</b>,
    cell: row => row.gap,
  },
  {
    name: <b>Status</b>,
    cell: row => row.status,
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
      />
    </>
  );
}

export default FeedbackScores;
