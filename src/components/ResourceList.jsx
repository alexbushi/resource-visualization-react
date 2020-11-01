import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ResourceSquare from "./ResourceSquare";
import Legend from "./Legend";

const ResourceList = ({ view }) => {
  const resources = useSelector((state) => state.entities.resources.list);

  return (
    <Fragment>
      <hr style={{ background: "white" }} />
      <h4 className='row justify-content-start ml-2'>{view.name}</h4>
      <div className='row align-items-start mb-3'>
        <div className='col-1'>
          <Legend view={view} />
        </div>
        <div className='col-11'>
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
    </Fragment>
  );
};

export default ResourceList;
