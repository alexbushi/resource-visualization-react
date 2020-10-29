import React, { useEffect, useState } from "react";
import DragNDrop from "./DragNDrop";

const defaultData = [
  {
    title: "group 1",
    items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  { title: "group 2", items: [] },
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

  return <DragNDrop data={data} />;
}

export default Test;
