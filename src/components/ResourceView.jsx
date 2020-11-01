import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadResources } from "../store/resources";
//import { selectSortedViews } from "../store/user";
import ResourceList from "./ResourceList";

const ResourceView = () => {
  const dispatch = useDispatch();
  //const views = useSelector(selectSortedViews);
  const resources = useSelector((state) => state.entities.resources.list);
  const viewList = useSelector((state) => state.entities.user.views);
  //let interval = 0;

  useEffect(() => {
    dispatch(loadResources());
    let interval = setInterval(() => dispatch(loadResources()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Fragment>
      <div className='container-fluid'>
        {viewList[0].items.map((view, index) => {
          return (
            view.shouldShow && (
              <ResourceList key={index} resources={resources} view={view} />
            )
          );
        })}
      </div>
      {/* <button onClick={() => console.log(views)}>hi</button> */}
    </Fragment>
  );
};

export default ResourceView;
