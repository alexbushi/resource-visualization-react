import React from "react";
import ResourceSquare from "./ResourceSquare";

const ResourceList = ({ resources, view }) => {
  return (
    <div className='row test align-items-center'>
      <div className='col-md-auto'>Legend</div>
      <div className='col' style={{ background: "blue" }}>
        <div className='d-flex flex-wrap p-2 align-items-center'>
          {view}
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
