import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: <b>Competency</b>,
    selector: row => row.competency,
    width: '300px',
    sortable: true,
  },
  {
    name: <b>Type</b>,
    selector: row => row.type,
    width: '150px',
    sortable: true,
  },
  {
    name: <b>Expected Score</b>,
    selector: row => row.expectedScore,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Self Score</b>,
    selector: row => row.selfScore,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Actual Score</b>,
    selector: row => row.actualScore,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Gap</b>,
    selector: row => row.gap,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Status</b>,
    selector: row => row.status,
    width: '100px',
    sortable: true,
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
    <div className="row mb-4 p-4">
      <div className="col-md-12">
        <h2>Feedback Scores</h2>
        <DataTable
          columns={columns}
          data={reports}
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default FeedbackScores;
