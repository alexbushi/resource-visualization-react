import React, { Fragment } from "react";
import {
  percentColorList,
  temperatureColorList,
  statusColorList,
} from "../constants";
import * as viewTypes from "../viewTypes";

const Legend = ({ view }) => {
  const determineLegendValues = () => {
    if (view.name === viewTypes.temperature.name) {
      return [45, 22.5, 0];
    } else if (view.name === viewTypes.status.name) {
      return ["GI", "CH", "NK", "NC", "SLP", "Other"];
    } else if (view.name === viewTypes.powerFlowkW.name) {
      return [25, 0, -25];
    } else {
      return [100, 50, 0];
    }
  };

  const determineLegendColors = () => {
    if (view.name === viewTypes.temperature.name) {
      return temperatureColorList;
    } else if (view.name === viewTypes.status.name) {
      return statusColorList;
    } else {
      return percentColorList;
    }
  };

  return (
    <Fragment>
      <div
        className='d-flex flex-row p-2 justify-content-center'
        style={{
          background: "#5c5952",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        {view.units}
      </div>
      <div
        className='d-flex flex-row justify-content-center pb-2'
        style={{
          background: "#5c5952",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div className='d-flex flex-column justify-content-between align-items-center my-2'>
          {determineLegendValues().map((value) => (
            <div className='pl-3' key={value}>
              {value}
            </div>
          ))}
        </div>
        <div className='d-flex flex-column  justify-content-between my-2'>
          {determineLegendColors()
            .slice(0)
            .reverse()
            .map((color, index) => (
              <div
                className='p-2 ml-2 mr-3'
                style={{
                  background: `rgb(${color.red},${color.green},${color.blue})`,
                }}
                key={(color, index)}
              >
                {}
              </div>
            ))}
        </div>
        {(view.name === viewTypes.powerFlowPercent.name ||
          view.name === viewTypes.powerFlowkW.name) && (
          <div className='d-flex flex-column justify-content-between mr-2 mb-2'>
            <div className='rotated-text'>Discharge</div>
            <div className='rotated-text'>Charge</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Legend;
