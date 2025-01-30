import React from 'react';

import DataTable from 'react-data-table-component';

import { CustomizedTable } from './Table';

const TechnicalBehaviouralSummaryTable = ({ reportsSummary }) => {

  return (
    <CustomizedTable
      headers={[
        { text: 'Competency' },
        { text: 'Meet' },
        { text: 'Percentage' },
      ]}
      rows={[
        ['Technical', `${reportsSummary.technical.meet} / ${reportsSummary.technical.total}`, reportsSummary.technical.percentage],
        ['Behavioural', `${reportsSummary.behavioural.meet} / ${reportsSummary.behavioural.total}`, reportsSummary.behavioural.percentage],
      ]}
    />
  );
}

export default TechnicalBehaviouralSummaryTable;
