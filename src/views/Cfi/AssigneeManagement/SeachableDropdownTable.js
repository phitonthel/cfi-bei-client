import React, { useState, useRef } from 'react';

import { Dropdown, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';

const SearchableDropdownTable = ({ users, onChange, selected }) => {
  const [search, setSearch] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState(users);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleRef = useRef(null);

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
    setShowDropdown(false);
  };

  const handleToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const renderDropdownMenu = () => {
    if (!toggleRef.current) return null;

    const toggleRect = toggleRef.current.getBoundingClientRect();

    return ReactDOM.createPortal(
      <div style={{ 
        position: 'absolute', 
        top: toggleRect.bottom + window.scrollY, 
        left: toggleRect.left + window.scrollX, 
        zIndex: 1050, 
        backgroundColor: '#fff', 
        border: '1px solid rgba(0, 0, 0, 0.15)', 
        borderRadius: '0.25rem', 
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.175)' 
      }}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={handleSearch}
          value={search}
        />
        {
          displayedUsers
            .map((user, index) => (
              <div key={index} onClick={() => handleSelect(user)} style={{ padding: '0.25rem 1.5rem', cursor: 'pointer' }}>
                {user.fullname}
              </div>
            ))
        }
      </div>,
      document.body
    );
  };

  return (
    <>
      <Dropdown show={showDropdown} onToggle={handleToggle} ref={toggleRef}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" ref={toggleRef}>
          {selected?.fullname || 'Select CFI Profile'}
        </Dropdown.Toggle>
      </Dropdown>
      {showDropdown && renderDropdownMenu()}
    </>
  );
};

export default SearchableDropdownTable;
