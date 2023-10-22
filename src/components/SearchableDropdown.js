import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

const SearchableDropdown = ({ users, onChange, selected }) => {
  const [search, setSearch] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    const filteredUsers = users.filter(user =>
      user.fullname.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 15);

    setDisplayedUsers(filteredUsers);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selected.fullname || 'Select User'}
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
          displayedUsers
            .slice(0, 15)
            .map((user, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(user)}>
                {user.fullname}
              </Dropdown.Item>
            ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchableDropdown;
