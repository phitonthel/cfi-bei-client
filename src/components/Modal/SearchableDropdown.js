import React from 'react';
import Select from 'react-select';

const SearchableDropdown = ({ options, onChange, value }) => {
  const handleChange = selectedOption => {
    onChange(selectedOption);
  };

  return (
    <Select 
      value={value}
      onChange={handleChange}
      options={options}
      getOptionLabel={(option) => option.fullname}
      getOptionValue={(option) => option.id}
    />
  );
};

export default SearchableDropdown;
