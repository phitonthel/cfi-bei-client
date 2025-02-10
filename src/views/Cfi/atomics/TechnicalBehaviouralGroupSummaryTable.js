import React from 'react';

import { CustomizedTable } from './Table';

const TechnicalBehaviouralGroupSummaryTable = ({ totalPercentage }) => {

  return (
    <CustomizedTable
      headers={[
        { text: 'Competency' },
        { text: 'Average Meet' },
        { text: 'Average Need Development' },
      ]}
      rows={[
        ['Technical', (totalPercentage.technical * 100).toFixed(2) + '%', ((1 - totalPercentage.technical) * 100).toFixed(2) + '%'],
        ['Behavioural', (totalPercentage.behavioural * 100).toFixed(2) + '%', ((1 - totalPercentage.behavioural) * 100).toFixed(2) + '%'],
      ]}
    />
  );
}

export default TechnicalBehaviouralGroupSummaryTable;
