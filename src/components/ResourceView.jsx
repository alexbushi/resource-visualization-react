import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadResources } from '../store/resources';
import ResourceList from './ResourceList';

const ResourceView = () => {
  const dispatch = useDispatch();
  const viewList = useSelector((state) => state.entities.user.views);
  const refreshRatems =
    useSelector((state) => state.entities.user.settings.refreshRate) * 1000;

  useEffect(() => {
    dispatch(loadResources());
    let interval = setInterval(() => dispatch(loadResources()), refreshRatems);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, refreshRatems]);

  return (
    <div className='container-fluid'>
      {viewList[0].items.map((view, index) => {
        return view.shouldShow && <ResourceList key={index} view={view} />;
      })}
    </div>
  );
};

export default ResourceView;
