import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const CustomPieChart = ({ data, colors }) => {
  return (
    <PieChart width={400} height={400}>
      <Legend verticalAlign='top' />
      <Pie
        isAnimationActive={false}
        startAngle={180}
        endAngle={0}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill='#8884d2'
        label
      >
        {data.map((entry, index) => (
          <Cell fill={colors[index % colors.length]} key={index} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
