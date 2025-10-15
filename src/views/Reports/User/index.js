import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetch } from '../../../apis/useFetch';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Table from './Table';

const UserReport = () => {
  const appUtilities = useSelector((state) => state.app.utilities);

  const [filterType, setFilterType] = useState('');
  const [filterName, setFilterName] = useState('');

  const queryKey = `/cfi/report/csv/users?cfiTypeAssessmentId=${appUtilities.cfiTypeAssessment.id}&filterType=${filterType}&filterName=${filterName}`;

  const { isLoading, data: reports } = useFetch(queryKey);
  const { data: orgHierarchies } = useFetch(`/options`);

  const handleUrlChange = (value) => {
    setFilterType(value.type || '');
    setFilterName(value.value || '');
  };

  if (isLoading) {
    return <LoadingSpinner text="This may take a few minutes" />;
  }

  return (
    <>
      <div>
        <Table
          reports={reports}
          orgHierarchies={orgHierarchies}
          onUrlChange={handleUrlChange}
        />
      </div>
    </>
  );
};

export default UserReport;
