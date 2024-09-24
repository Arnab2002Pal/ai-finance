import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Growth",
    Current: 10,
    Potential: 30,
    // amt: 100,
  },
  
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="60%" height="100%">
        <BarChart
          width={50}
          height={50}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="2 2" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip /> 
          {/* <Legend /> */}
          <Bar
            dataKey="Current"
            fill="#de1a24"
            
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Potential"
            fill="#3f8f29"
            // activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
