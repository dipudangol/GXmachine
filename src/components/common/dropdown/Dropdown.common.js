import React from "react";
import PropTypes from "prop-types";

export const DropdownMenu = props => {
  const { children } = props;
  return (
    <ul className="dropdown-menu">
      { children }
    </ul>
  )
}

DropdownMenu.propTypes = {
};

export const DropdownMenuItem = props => {
  const { onClick, children, danger } = props;

  return (
    <li 
      onClick={onClick} 
      className={danger ? "dropdown-menu-item danger" : "dropdown-menu-item "}
    >
      { children }
    </li>
  )
}

DropdownMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  danger: PropTypes.bool
};

DropdownMenuItem.defaultProps = {
  danger: false
};

export const DropdownMenuSeparator = () => {
  return (
    <div className="dropdown-menu-separator"></div>
  )
}