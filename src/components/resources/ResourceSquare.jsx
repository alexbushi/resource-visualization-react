import React from 'react';
import ReactTooltip from 'react-tooltip';
import calculateColor from '../..//utils/calculateColor';
import * as viewTypes from '../../constants/viewTypes';
import { useSelector } from 'react-redux';

const ResourceSquare = ({ resource, index, view }) => {
  const maxPower = useSelector((state) => state.entities.resources.maxPower);
  const squareLength = useSelector(
    (state) => state.entities.user.settings.squareSize
  );

  const { redValue: r, greenValue: g, blueValue: b } = calculateColor(
    resource,
    view,
    maxPower
  );

  return (
    <div>
      <div
        className='m-1'
        style={{
          background: `rgb(${r},${g},${b})`,
          color: 'yellow',
          height: `${squareLength}px`,
          width: `${squareLength}px`,
        }}
        data-tip
        data-for={index.toString()}
      >
        {resource.resourceStatus === 'CH' &&
        (view.name === viewTypes.powerFlowkW.name ||
          view.name === viewTypes.powerFlowPercent.name)
          ? 'C'
          : ''}
      </div>
      <ReactTooltip id={index.toString()} place='bottom' effect='solid'>
        <br /> {`EVSE Name: ${resource.evseName}`}
        <br /> {`EV Name: ${resource.evName}`}
        <br /> {`EVSE ID: ${resource.evseId}`}
        <br /> {`VIN: ${resource.vin}`}
        <br /> {`Status: ${resource.resourceStatus}`}
        <br /> {`Power Flow (kW): ${resource.realPower} kW`}
        <br /> {`Power Flow (%): ${resource.powerFlowPercent}%`}
        <br /> {`Max Power Capacity: ${resource.maxPowerCapacity} kW`}
        <br /> {`SOC: ${resource.soc}%`}
        <br /> {`Cell Avg Temp: ${resource.tCellAvg} °C`}
        <br /> {`Cell Max Temp: ${resource.tCellMax} °C`}
        <br /> {`Cell Min Temp: ${resource.tCellMin} °C`}
      </ReactTooltip>
    </div>
  );
};

export default ResourceSquare;
