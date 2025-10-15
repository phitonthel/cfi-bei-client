import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAppReport } from '../../../../redux/appSlice';
import Dropdown from 'react-bootstrap/Dropdown';

const Actions = ({ user, link }) => {
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
      label: 'Report 2024',
      onClick: () => handleNavigation('/hr/ts/individual-report'),
    },
    user.level !== "Direktur" && link && {
      label: 'Report 2023',
      onClick: () => window.open(link),
    },
    ["Kepala Divisi", "Direktur"].includes(user.level) && {
      label: 'Team Report 2024',
      onClick: () => handleNavigation('/hr/ts/team-report'),
    },
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
