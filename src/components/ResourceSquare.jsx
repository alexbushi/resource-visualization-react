import React from "react";
import ReactTooltip from "react-tooltip";
import calculateColor from "../utils/calculateColor";
import * as viewTypes from "../viewTypes";

const ResourceSquare = ({ resource, index, view }) => {
  const { redValue: r, greenValue: g, blueValue: b } = calculateColor(
    resource,
    view
  );

  return (
    <div>
      <div
        className='p-0 m-1 resource-square'
        style={{ background: `rgb(${r},${g},${b})` }}
        data-tip
        data-for={index.toString()}
      >
        {resource.resourceStatus === "CH" &&
        (view === viewTypes.powerFlowkW || view === viewTypes.powerFlowPercent)
          ? "C"
          : ""}
      </div>
      <ReactTooltip id={index.toString()} place='bottom' effect='solid'>
        <br /> {`EVSE Name: ${resource.evseName}`}
        <br /> {`EV Name: ${resource.evName}`}
        <br /> {`EVSE ID: ${resource.evseId}`}
        <br /> {`VIN: ${resource.vin}`}
        <br /> {`Status: ${resource.resourceStatus}`}
        <br /> {`Real Power: ${resource.realPower} kW`}
        <br /> {`Power Flow (%): ${resource.powerFlowPercent}%`}
        <br /> {`SOC: ${resource.soc}%`}
      </ReactTooltip>
    </div>
  );
};

export default ResourceSquare;
