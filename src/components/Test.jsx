import React, { useEffect, useState } from "react";
import DragNDrop from "./DragNDrop";
import * as viewTypes from "../viewTypes";

const defaultData = [
  {
    title: "Variables",
    items: [viewTypes.soc, viewTypes.temperature, viewTypes.powerFlowPercent],
  },
];

function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // get from store instead
    if (localStorage.getItem("List")) {
      console.log(localStorage.getItem("List"));
      setData(JSON.parse(localStorage.getItem("List")));
    } else {
      setData(defaultData);
    }
  }, [setData]);

  return (
    <div className='container-fluid'>
      <DragNDrop data={data} />
    </div>
  );
}

export default Test;
