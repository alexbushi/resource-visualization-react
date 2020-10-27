import React from "react";
//import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/user";
import { loadResources } from "../store/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChargingStation, faCar } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.entities.user.token);
  const numOfRscs = useSelector(
    (state) => state.entities.resources.list.length
  );
  const loadingResources = useSelector(
    (state) => state.entities.resources.loading
  );

  const logout = () => {
    dispatch(logoutUser());
    console.log("here");
    window.location = "/";
  };

  const update = () => {
    dispatch(loadResources());
  };

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light navbar-custom mb-3'
      style={{ height: "50px" }}
    >
      <FontAwesomeIcon icon={faChargingStation} size='lg' />
      <FontAwesomeIcon icon={faCar} size='lg' />
      {numOfRscs === 0 ? (
        <div className='navbar-custom ml-2'>Resource Visualization</div>
      ) : (
        <div className='navbar-custom ml-2'>Resources: {numOfRscs}</div>
      )}
      {token && (
        <button className='btn btn-dark ml-2' onClick={() => update()}>
          {loadingResources ? "Updating" : "Update"}
          {loadingResources && (
            <div
              className='spinner-border ml-2 spinner-border-sm'
              role='status'
            >
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
      )}
      {token && (
        <button className='btn btn-secondary ml-auto' onClick={() => logout()}>
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
