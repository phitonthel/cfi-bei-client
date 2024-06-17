import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import { FilterSearchBar } from './FilterSearchBar';

const FilteredDataTable = ({
  data,
  columns,
  filterKeys, // array of string
  otherProps,
}) => {
  const [filterText, setFilterText] = useState('');
  
  // Function to handle the input change and filter the data
  const handleFilter = event => {
    const { value } = event.target;
    setFilterText(value);
  };
  
  // Filtered data based on the filterText
  const filteredData = filterText === '' ? data : data.filter(item => {
    const searchText = filterText.toLowerCase();
    return filterKeys.some(key => 
      item[key] && item[key].toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <FilterSearchBar onFilter={handleFilter} filterText={filterText} />
      <DataTable
        columns={columns} // define your columns here
        data={filteredData}
        highlightOnHover
        pagination
        paginationPerPage={10}
        {...otherProps}
        // ... other props
      />
    </div>
  );
};

export default FilteredDataTable;
