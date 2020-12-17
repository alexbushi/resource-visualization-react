import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadResources } from "../store/resources";
//import { getSavedUserSettings } from "../store/user";
import ResourceList from "./ResourceList";

const ResourceView = () => {
  const dispatch = useDispatch();
  const viewList = useSelector((state) => state.entities.user.views);

  useEffect(() => {
    dispatch(loadResources());
    //dispatch(getSavedUserSettings());
    let interval = setInterval(() => dispatch(loadResources()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      {viewList[0].items.map((view, index) => {
        return view.shouldShow && <ResourceList key={index} view={view} />;
      })}
    </div>
  );
};

export default ResourceView;
