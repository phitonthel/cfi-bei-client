import React, { Component } from "react";
import { useSelector } from 'react-redux';
import { useLocation, NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import styled from 'styled-components';

import logo from "assets/img/reactlogo.png";

const StyledNavDropdown = styled(NavDropdown)`
    /* default styles for NavDropdown */

    ${({ isActive }) => isActive && `
        background-color: #404040; /* or your desired highlight color */
        /* any other styles you want to apply when it's active */
    `}
`;

const StyledDropdownItem = styled(NavLink)`
    padding: 15px 40px;  // Increased padding for better spacing
    color: #616161;
    transition: all 0.2s;
    display: flex;       // Flex layout for better alignment
    align-items: center; // Vertically center the text and icon
    border-bottom: 1px solid #404040;  // Divider between items

    &:last-child {
        border-bottom: none; // Remove border from the last item
    }

    &:hover {
        background-color: #404040;
        color: #ffffff;
    }

    i {
        margin-right: 10px;
    }
`;

function Sidebar({ color, image, routes }) {
  const authUser = useSelector(state => state.auth.user);

  const location = useLocation();

  const activeRoute = (routeName, children = []) => {
    // Check if the current pathname matches the parent route
    if (location.pathname === routeName) return "active";

    // Check if the current pathname matches any of the children routes
    for (const child of children) {
      if (location.pathname === child.layout + child.path) return "active";
    }

    return "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/idx.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="">
            IDX CFI
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            const isRedirect = prop.redirect
            // const isAccessValid = !authUser.level ? true : prop.access.includes(authUser.level) // if guest, true
            const isHiddenFromSidebar = prop.hidden

            // if (!isRedirect && !isHiddenFromSidebar && isAccessValid) {
              if (!isRedirect && !isHiddenFromSidebar) {
              if (prop.children) {
                return (
                  <StyledNavDropdown
                    className="custom-nav-dropdown"
                    title={
                      <>
                        <i className={prop.icon} style={{ marginRight: '10px', fontSize: '16px' }} />
                        <span style={{ marginLeft: '6px', fontSize: '14px' }}>{prop.name}</span>
                      </>
                    }
                    id={`nav-dropdown-${key}`}
                    key={key}
                    isActive={activeRoute(prop.layout + prop.path, prop.children) === "active"}
                  >
                    {prop.children.map((child, childKey) => (
                      <StyledDropdownItem
                        to={child.layout + child.path}
                        activeClassName="active"
                        key={childKey}
                      >
                        <i className={child.icon} />
                        {child.name}
                      </StyledDropdownItem>
                    ))}
                  </StyledNavDropdown>
                )
              } else {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                )
              }
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
