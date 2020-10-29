import React from "react";
import DragNDrop from "./DragNDrop";

const defaultData = [
  {
    title: "group 1",
    items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  { title: "group 2", items: [] },
];

function Test() {
  return <DragNDrop data={defaultData} />;
}

export default Test;
