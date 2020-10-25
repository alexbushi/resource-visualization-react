import React from "react";
import { percentColorList } from "../constants";
import calculateColor from "../utils/calculateColor";

const Test = () => {
  const values = Array.from(Array(1000).keys());

  return (
    <div>
      {values.map((value, index) => {
        const { redValue: r, greenValue: g, blueValue: b } = calculateColor(
          value / 10,
          percentColorList
        );
        return (
          <div key={index} style={{ background: `rgb(${r},${g},${b})` }}>
            {index}
            {" " + r}
            {" " + g}
            {" " + b}
          </div>
        );
      })}
    </div>
  );
};

export default Test;
