import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const FilterComponent = ({ filterText, onFilter }) => (
  <div className="d-flex justify-content-end">
    <input
      id="search"
      type="text"
      placeholder="Filter By Text"
      aria-label="Search Input"
      className="form-control col-2 ms-auto my-2" // Bootstrap classes for styling and alignment
      value={filterText}
      onChange={onFilter}
    />
  </div>
);

const FilteredDataTable = ({ data, columns }) => {
  const [filterText, setFilterText] = useState('');
  
  // Function to handle the input change and filter the data
  const handleFilter = event => {
    const { value } = event.target;
    setFilterText(value);
  };
  
  // Filtered data based on the filterText
  const filteredData = filterText === '' ? data : data.filter(item => {
    const searchText = filterText.toLowerCase();
    return (
      (item.revieweeFullname && item.revieweeFullname.toLowerCase().includes(searchText)) ||
      (item.revieweeDivision && item.revieweeDivision.toLowerCase().includes(searchText)) ||
      (item.revieweeLevel && item.revieweeLevel.toLowerCase().includes(searchText)) ||
      (item.reviewerFullname && item.reviewerFullname.toLowerCase().includes(searchText)) ||
      (item.reviewerDivision && item.reviewerDivision.toLowerCase().includes(searchText)) ||
      (item.reviewerLevel && item.reviewerLevel.toLowerCase().includes(searchText))
    );
  });

  return (
    <div>
      <FilterComponent onFilter={handleFilter} filterText={filterText} />
      <DataTable
        columns={columns} // define your columns here
        data={filteredData}
        highlightOnHover
        pagination
        paginationPerPage={10}
        // ... other props
      />
    </div>
  );
};

export default FilteredDataTable;
