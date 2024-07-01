import React, { useState } from 'react';

import { Dropdown, FormControl } from 'react-bootstrap';

const SearchableDropdown = ({ items, field, onChange, selected }) => {
  const [search, setSearch] = useState('');
  const [displayedItems, setDisplayedItems] = useState(items);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    const filteredItems = items.filter(item =>
      item[field].toLowerCase().includes(value.toLowerCase())
    ).slice(0, 15);

    setDisplayedItems(filteredItems);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selected[field] || 'Select Item'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={handleSearch}
          value={search}
        />
        {
          displayedItems
            .slice(0, 15)
            .map((user, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(user)}>
                {`${user[field]}`}
              </Dropdown.Item>
            ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchableDropdown;
