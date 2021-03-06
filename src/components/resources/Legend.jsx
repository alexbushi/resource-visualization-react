import React, { Fragment } from 'react';
import {
  percentColorList,
  temperatureColorList,
  statusColorList,
} from '../../constants/colorLists';
import * as viewTypes from '../../constants/viewTypes';
import { useSelector } from 'react-redux';

const Legend = ({ view }) => {
  const maxPower = useSelector((state) => state.entities.resources.maxPower);

  const determineLegendValues = () => {
    if (view.name === viewTypes.temperature.name) {
      return viewTypes.temperature.legendValues;
    } else if (view.name === viewTypes.status.name) {
      return viewTypes.status.legendValues;
    } else if (view.name === viewTypes.powerFlowkW.name) {
      return [maxPower, 0, maxPower * -1];
    } else {
      return viewTypes.soc.legendValues;
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

  const getStyle = () => {
    if (navigator.userAgent.indexOf('Chrome') > -1)
      return 'd-flex flex-column justify-content-between mb-2 mr-3';
    return 'd-flex flex-column justify-content-between ml-3 mb-2';
  };

  return (
    <Fragment>
      <div
        className='d-flex flex-row p-2 justify-content-center'
        style={{
          background: '#5c5952',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        {view.units}
      </div>
      <div
        className='d-flex flex-row justify-content-center pb-2'
        style={{
          background: '#5c5952',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        <div className='d-flex flex-column justify-content-between align-items-center my-2'>
          {determineLegendValues().map((value) => (
            <div className='pl-3' key={value}>
              {value}
            </div>
          ))}
        </div>
        <div className='d-flex flex-column justify-content-between my-2'>
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
        {view.name === viewTypes.powerFlowkW.name && (
          <div className={getStyle()}>
            <div className='rotated-text'>Discharge</div>
            <div className='rotated-text'>Charge</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Legend;
