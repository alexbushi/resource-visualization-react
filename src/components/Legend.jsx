import React, { Fragment } from "react";
import {
  percentColorList,
  temperatureColorList,
  statusColorList,
} from "../constants";
import * as viewTypes from "../viewTypes";

const Legend = ({ view }) => {
  const determineLegendValues = () => {
    if (view === viewTypes.temperature) {
      return [45, 22.5, 0];
    } else if (view === viewTypes.status) {
      return ["GI", "CH", "NK", "NC", "SLP", "Other"];
    } else if (view === viewTypes.powerFlowkW) {
      return [25, 0, -25];
    } else {
      return [100, 50, 0];
    }
  };

  const determineLegendColors = () => {
    if (view === viewTypes.temperature) {
      return temperatureColorList;
    } else if (view === viewTypes.status) {
      return statusColorList;
    } else {
      return percentColorList;
    }
  };

  return (
    <Fragment>
      <div
        className='d-flex flex-row p-2 justify-content-center'
        style={{ background: "#5c5952" }}
      >
        {view}
      </div>
      <div
        className='d-flex flex-row justify-content-center'
        style={{ background: "#5c5952" }}
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
      </div>
    </Fragment>
  );
};

export default Legend;
