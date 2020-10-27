import React from "react";
import ResourceSquare from "./ResourceSquare";
import Legend from "./Legend";

const ResourceList = ({ resources, view }) => {
  return (
    <div className='row align-items-start mb-3'>
      {/* to resizing based on device here */}
      <div className='col-1'>
        <Legend view={view} />
      </div>
      <div className='col'>
        <div className='d-flex flex-wrap'>
          {resources.map((resource, index) => (
            <ResourceSquare
              key={index}
              resource={resource}
              index={index}
              view={view}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
