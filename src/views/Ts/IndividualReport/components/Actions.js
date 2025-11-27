import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAppReport } from '../../../../redux/appSlice';
import Dropdown from 'react-bootstrap/Dropdown';

const Actions = ({ user, links = [] }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNavigation = (path) => {
    dispatch(setAppReport({
      selectedUserReport: {
        id: user.id,
        fullname: user.fullname,
      },
    }));
    history.push(path);
  };

  const actionsConfig = [
    user.level !== "Direktur" && {
      label: 'Individual Report 2025',
      onClick: () => handleNavigation('/hr/ts/individual-report'),
    },
    ["Kepala Divisi", "Direktur"].includes(user.level) && {
      label: 'Team Report 2025',
      onClick: () => handleNavigation('/hr/ts/team-report'),
    },
    // Add dynamic links from the links array
    ...links.map(linkItem => ({
      label: `${linkItem.type || 'Report'}`,
      onClick: () => window.open(linkItem.link),
    })),
  ].filter(Boolean);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        size="sm" // Smaller button size
      >
        Select Report
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {actionsConfig.map((action, index) => (
          <Dropdown.Item
            key={index}
            onClick={action.onClick}
            className="py-1" // Reduce padding for dropdown items
          >
            {action.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};


export default Actions;
