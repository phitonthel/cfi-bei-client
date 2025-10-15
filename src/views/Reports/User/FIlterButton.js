import React, { useState } from 'react';

const FilterButton = ({ options, onFilterChange, buttonLabel = "Filter", style = {} }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={style}>
      <button className="btn btn-primary" onClick={toggleDropdown}>
        {buttonLabel}
      </button>
      {showDropdown && (
        <select
          className="form-select ml-2"
          value={selectedValue}
          onChange={handleChange}
          style={{ width: '200px' }}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FilterButton;
