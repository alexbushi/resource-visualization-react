import React from "react";
import ResourceSquare from "./ResourceSquare";

const ResourceList = ({ resources, view }) => {
  return (
    <div className='d-flex flex-wrap p-2'>
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
  );
};

export default ResourceList;
