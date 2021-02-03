import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ResourceSquare from './ResourceSquare';
import VariableLegend from './Legend';
import * as viewTypes from '../../constants/viewTypes';
//import CustomPieChart from '../graphs/CustomPieChart';

const ResourceList = ({ view }) => {
  const resources = useSelector((state) => state.entities.resources.list);
  const EVNCresources = useSelector(
    (state) => state.entities.resources.EVNClist
  );
  const showEVNC = useSelector((state) => state.entities.resources.showEVNC);
  const totalPowerFlow = useSelector(
    (state) => state.entities.resources.totalPowerFlow
  );

  const determineList = () => {
    return showEVNC ? EVNCresources : resources;
  };

  // const statusChartData = [
  //   {
  //     name: 'Grid-Integrated',
  //     value: useSelector((state) => state.entities.resources.GICount),
  //   },
  //   {
  //     name: 'Not Grid-Integrated',
  //     value: useSelector((state) => state.entities.resources.NonGICount),
  //   },
  // ];

  const determineVariableTitle = () => {
    if (view.name === viewTypes.powerFlowkW.name) {
      return view.name + ' = ' + totalPowerFlow;
    } else {
      return view.name;
    }
  };

  return (
    <Fragment>
      <hr style={{ background: 'white' }} />
      <h4 className='row justify-content-start ml-2'>
        {determineVariableTitle()}
      </h4>
      <div className='row align-items-start mb-3'>
        <div className='col-1'>
          <VariableLegend view={view} />
        </div>
        <div className='col-11'>
          <div className='d-flex flex-wrap'>
            {determineList().map((resource, index) => {
              return (
                <ResourceSquare
                  key={index}
                  resource={resource}
                  index={index}
                  view={view}
                />
              );
            })}
            {/* {view.name === viewTypes.status.name &&
              process.env.NODE_ENV === 'development' && (
                <CustomPieChart
                  data={statusChartData}
                  colors={['#008000', '#808080']}
                />
              )} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResourceList;
