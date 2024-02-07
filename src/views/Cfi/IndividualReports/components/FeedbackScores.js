import React from 'react';
import DataTable from 'react-data-table-component';
import { CustomizedTable } from './Table';

const columns = [
  {
    name: <b>Competency</b>,
    selector: row => row.title,
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
    name: <b>Expected Score in Current Position</b>,
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
    name: <b>Validated Score</b>,
    selector: row => row.actualScore,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Gap between validated score and expected score</b>,
    selector: row => row.gap,
    width: '100px',
    sortable: true,
  },
  {
    name: <b>Competency Status</b>,
    selector: row => row.status,
    width: '200px',
    sortable: true,
  },
];

const customStyles = {
  headCells: {
    style: {
      height: '120px',
    },
  },
};

const FeedbackScores = ({ reports, reportsSummary }) => {

  return (
    <div className="row mb-4 p-1">
      <div className="col-md-12">
        <h2>CFI Result</h2>
        <CustomizedTable 
          headers={[
            { text: 'Competency'},
            { text: 'Meet'},
            { text: 'Percentage'},
          ]}
          rows={[
            ['Technical', `${reportsSummary.technical.meet} / ${reportsSummary.technical.total}`, reportsSummary.technical.percentage],
            ['Behavioural', `${reportsSummary.behavioural.meet} / ${reportsSummary.behavioural.total}`, reportsSummary.behavioural.percentage],
          ]}
        />
        <DataTable
          columns={columns}
          data={reports}
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default FeedbackScores;
