import React from "react";
import { useDispatch } from "react-redux";
import { setSavedUserSettings, getSavedUserSettings } from "../store/user";

export default function SettingsView() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(getSavedUserSettings())}>Get</button>
      <button onClick={() => dispatch(setSavedUserSettings(10000, 10))}>
        Set
      </button>
    </div>
  );
}
