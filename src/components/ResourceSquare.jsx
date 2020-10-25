import React from "react";
import ReactTooltip from "react-tooltip";

const ResourceSquare = ({ resource, index }) => {
  return (
    <div>
      <div
        className='p-2 resource m-1'
        style={{ backgroundColor: "rgb(255, 0, 0)" }}
        data-tip
        data-for={index.toString()}
      >
        {}
      </div>
      <ReactTooltip id={index.toString()} place='bottom' effect='solid'>
        {`EVSE Name: ${resource.evseName}`}
        <br /> {`EV Name: ${resource.evName}`}
        <br /> {`EV Name: ${resource.evName}`}
        <br /> {`EVSE ID: ${resource.evseId}`}
        <br /> {`VIN: ${resource.vin}`}
        <br /> {`Resource Status: ${resource.resourceStatus}`}
        <br /> {`Real Power: ${resource.realPower} kW`}
        <br /> {`SOC: ${resource.soc} %`}
      </ReactTooltip>
    </div>
  );
};

export default ResourceSquare;
