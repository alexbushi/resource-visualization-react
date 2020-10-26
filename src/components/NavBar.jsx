import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light navbar-custom'>
      <div className='navbar-custom'>Resource Visualization</div>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='navbar-nav'>
        <NavLink className='nav-item nav-link' to='/not-found'>
          Resources
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
