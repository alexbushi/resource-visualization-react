import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ResourceSquare from "./ResourceSquare";
import VariableLegend from "./Legend";
import * as viewTypes from "../viewTypes";
import CustomPieChart from "./graphs/CustomPieChart";

const ResourceList = ({ view }) => {
  const resources = useSelector((state) => state.entities.resources.list);

  const statusChartData = [
    {
      name: "Grid-Integrated",
      value: useSelector((state) => state.entities.resources.GICount),
    },
    {
      name: "Not Grid-Integrated",
      value: useSelector((state) => state.entities.resources.NonGICount),
    },
  ];

  return (
    <Fragment>
      <hr style={{ background: "white" }} />
      <h4 className='row justify-content-start ml-2'>{view.name}</h4>
      <div className='row align-items-start mb-3'>
        <div className='col-1'>
          <VariableLegend view={view} />
        </div>
        <div className='col-11'>
          <div className='d-flex flex-wrap'>
            {resources.map((resource, index) => {
              return (
                <ResourceSquare
                  key={index}
                  resource={resource}
                  index={index}
                  view={view}
                />
              );
            })}
            {view.name === viewTypes.status.name && (
              <CustomPieChart
                data={statusChartData}
                colors={["#008000", "#808080"]}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResourceList;
