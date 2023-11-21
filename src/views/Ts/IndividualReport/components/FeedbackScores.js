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

// Define any custom styles for your DataTable here
const customStyles = {
  headers: {
    style: {
      fontSize: '6px', // Adjust the font size as needed
    },
  },
  // Add any other custom styles you want for different parts of the table
};

const FeedbackScores = ({ reports, aggregatedAverage }) => {
  const dataWithAverage = [
    ...reports,
    {
      ...aggregatedAverage,
      title: 'Average' 
    }
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={dataWithAverage}
        highlightOnHover
        customStyles={customStyles}
      />
    </>
  );
}

export default FeedbackScores;
