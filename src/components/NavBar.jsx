import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/user";
import { loadResources } from "../store/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChargingStation, faCar } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "./SettingsModal";
import DragNDrop from "./DragNDrop";

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
    window.location = "/";
  };

  const update = () => {
    dispatch(loadResources());
  };

  const showNavBarItems = () => {
    if (token) {
      return (
        <Fragment>
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
          <div className='ml-auto'>
            <DragNDrop />
          </div>
          <div className='ml-4'>
            <SettingsModal />
            <button className='btn btn-secondary ml-3' onClick={() => logout()}>
              Logout
            </button>
          </div>
        </Fragment>
      );
    }
    return;
  };

  return (
    <div className='d-flex p-2 navbar navbar-expand-lg navbar-custom mb-3'>
      <FontAwesomeIcon
        className='align-self-center'
        icon={faChargingStation}
        size='2x'
      />
      <FontAwesomeIcon className='align-self-center' icon={faCar} size='2x' />
      {numOfRscs === 0 ? (
        <div className='ml-2 navbar-text'>Resource Visualization</div>
      ) : (
        <div className='ml-2 navbar-text'>Resources: {numOfRscs}</div>
      )}

      {showNavBarItems()}
    </div>
  );
};

export default NavBar;
