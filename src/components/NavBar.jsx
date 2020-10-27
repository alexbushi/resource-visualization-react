import React from "react";
//import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.entities.user.token);

  const logout = () => {
    dispatch(logoutUser());
    console.log("here");
    window.location = "/";
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light navbar-custom'>
      <div className='navbar-custom'>Resource Visualization</div>
      {token && (
        <button className='btn btn-secondary' onClick={() => logout()}>
          Logout
        </button>
      )}

      {/* <div className='navbar-nav'>
        <NavLink className='nav-item nav-link' to='/not-found'>
          Resources
        </NavLink>
      </div> */}
    </nav>
  );
};

export default NavBar;
